"""
Script to be used as a FaaS in order to 
notify UE(s) close to a target location.

Parameters:
===========

base_url: str
    The url of the MEC Platform providing
    the Location APIs.

latitude: float
    Latitude geo position
    
longitude: float
    Longitude geo position
"""

from typing import List
import pymongo
import argparse
import requests
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from construct_mail import constructMailBody
# We assume that the below addresses will be known
STORAGE_URL = 'mongodb://10.152.183.68'
PORT=27017
DATABASE='EmailAddresses'
COLLECTION='address_email'




parser = argparse.ArgumentParser()
parser.add_argument(
    "--api",
    required=True,
    help="Url to the desired API.",
)
parser.add_argument(
    "--address",
    default=None,
    help="The address of a given UE.",
)
parser.add_argument(
    "--latitude",
    default=None,
    help="Latitude geo position.",
)
parser.add_argument(
    "--longitude",
    default=None,
    help="Longitude geo position.",
)

parser.add_argument(
    "--user_type",
    default=None,
    help="Type of the UE.",
)
parser.add_argument(
    "--distance",
    default=None,
    help="Distance from target address/location.",
)
parser.add_argument(
    "--humidity",
    default=None,
    help="The humidity as observed from the sensor.",
)
parser.add_argument(
    "--temperature",
    default=None,
    help="The temperature as observed from the sensor.",
)
parser.add_argument(
    "--datetime",
    default=None,
    help="The datetime of the measurement.",
)
parser.add_argument(
    "--address_name",
    default=None,
    help="The address name of the device.",
)

args = parser.parse_args()

def getUsers(url, **kwargs):
    """
    Find the relevant UE(s) and 
    return their addresses.
    """
    
    r = requests.get(url, params=kwargs)
    if r.status_code != 200:
        return []
    else:
        r = r.json()
        addresses = [el['address'] for el in r['user_list']['user']]
        return addresses

def getMailAddresses(addresses: List):
    
    myclient = pymongo.MongoClient(STORAGE_URL, PORT)
    db = myclient[DATABASE]
    collection = db[COLLECTION]
    mail_addresses = [el['ue']['email'] for el in collection.find({'ue.address':{"$in": addresses}})]
    return mail_addresses



def sendEmails(email_addresses: List, address = None, latitude =None, longitude =None, data_dict: dict = None):
    
    sender = "tandem-demo-sender@intracom-telecom.com" 
    
    # msg = MIMEText(message,'plain','utf-8')
    msg = MIMEMultipart("alternative")
    msg['From'] = sender
    msg['To'] = ", ".join(email_addresses)
    msg['Subject'] = 'Alert message!'

    text, html = constructMailBody(sender, email_addresses, address=address, latitude=latitude, longitude=longitude, **data_dict)
    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")
    
    # The email client will try to render the last part first
    msg.attach(part1)
    msg.attach(part2)
    try:
        smtpObj = smtplib.SMTP('extmail3.intracom-telecom.com', 25)
        smtpObj.ehlo()
        smtpObj.sendmail(sender, email_addresses, msg.as_string())
        smtpObj.close()
        print("Successfully sent email")
    except smtplib.SMTPException:
        print("Error: Unable to send email")

def main():
    
    dict = {k:v for k,v in vars(args).items() if v != 'None'}
    # data 
    extra_data = ['humidity', 'temperature', 'address_name', 'datetime']

    extra_data_dict = {k:None for k in extra_data}
    for k in extra_data_dict.keys():
            if k in dict:
                # remove non relevant to the query fields 
                # that will be used for the email
                extra_data_dict[k] = dict.pop(k)
    
    url = dict.pop('api')
    
    # get the addresses of the UE(s)
    addresses = getUsers(url, **dict)
    if len(addresses) == 0:
        print("There are no users to notify.")
    else:
        # get the mail addresses that correspond to the above addresses
        mail_addresses = getMailAddresses(addresses)
        print('\n\nmail_addresses: ', mail_addresses)
        # send alert email to each address
        if 'address' in dict.keys():
            sendEmails(mail_addresses, address=dict['address'], data_dict=extra_data_dict)
        elif 'latitude' in dict.keys() and 'longitude' in dict.keys():
            sendEmails(mail_addresses, latitude = dict['latitude'], longitude = dict['longitude'], data_dict=extra_data_dict)


if __name__ == "__main__":
    main()