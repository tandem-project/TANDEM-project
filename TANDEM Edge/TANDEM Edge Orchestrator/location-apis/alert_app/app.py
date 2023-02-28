###################################################################
#    ____ ___  ___  _____________  ____  ____ ____  _____
#   / __ `__ \/ _ \/ ___/ ___/ _ \/ __ \/ __ `/ _ \/ ___/
#  / / / / / /  __(__  |__  )  __/ / / / /_/ /  __/ /
# /_/ /_/ /_/\___/____/____/\___/_/ /_/\__, /\___/_/
#                                     /____/
###################################################################
# Title:        messenger
# Version:      2.5
# Description:  Enters MQTT messages from EdgeX into InfluxDB
# Author:       Jonas Werner
###################################################################
import paho.mqtt.client as mqtt
import time
import json
import argparse
from influxdb import InfluxDBClient
import datetime
import os
import requests
import logging

dbhost = os.getenv('INFLUXDB_NAME')
dbport = os.environ.get('INFLUXDB_IP')
broker_address  = os.environ.get('MQTT_NAME')
broker_ip = os.environ.get('MQTT_IP')

# Set environment variables
# MQTTT authentication + port need to be set separately
# on line 92 and 95 if required
#broker_address  = "<edgex ip>"

##broker_address  = "mqtt"
##dbhost          = "influxdb"
topic           = "edgex-tutorial"
#dbhost          = "<edgex ip>"
##dbport          = 8086
#dbport          = 30886
dbuser          = "root"
dbpassword      = "pass"
dbname          = "sensordata"
prev_id         =  ""

def influxDBconnect():

    """Instantiate a connection to the InfluxDB."""
    influxDBConnection = InfluxDBClient(dbhost, dbport, dbuser, dbpassword, dbname)

    return influxDBConnection



def influxDBwrite(device, sensorName, sensorValue, timestamp):

    logging.warning("Will write to influx")
    timestamp_now = str(datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'))
    logging.warning(timestamp_now)

    measurementData = [
        {
            "measurement": device,
            "tags": {
                "gateway": device,
                "location": "Paiania"
            },
            "time": timestamp_now,
            "fields": {
                sensorName: sensorValue,
                "measurement_time": timestamp
            }
        }
    ]
    influxDBConnection.write_points(measurementData, time_precision='ms')



def on_message(client, userdata, message):
    global prev_id
    m = str(message.payload.decode("utf-8"))

    # Create a dictionary and extract the current values
    obj = json.loads(m)
    #logging.warning(obj)
    # current date and time
    ##timestamp = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')

    # Extract the data from each sensor, even if the MQTT message contain multiple entries

    curr_id = obj.get("id")

    if curr_id == prev_id:
        return
    else:

        for entry in obj["readings"]:
            logging.warning(type(entry["origin"]))
            logging.warning(' '.join([str(k) for k in entry.keys()]))
            logging.warning(' '.join([str(entry[k]) for k in entry.keys()]))

            logging.warning("Sensor: %s: Reading: %s" % (entry["name"], entry["value"]) )
            logging.warning(datetime.datetime.fromtimestamp(entry["origin"] // 1000000000))
            device      = entry["device"]
            sensorName  = entry["name"]
            sensorValue = entry["value"]
            timestamp = str(datetime.datetime.fromtimestamp(entry["origin"] // 1000000000))
        # Write data to influxDB
            influxDBwrite(device, sensorName, sensorValue, timestamp)
            send_alert(sensorName, sensorValue, timestamp, device)
        prev_id = curr_id

def checkValues(name, value):
    result = {
        'temperature': None,
        'humidity': None,
        'alert': False
    }
    thresholds = {
        'temperature': 80,
        'humidity': 80,
    }
    if name in thresholds and int(value) >= int(thresholds[name]):
        result[name] = value
        result['alert'] = True
    
    return result


def send_alert(name, value, datetime, device):
    logging.warning('Evaluating rule....')
    check_result = checkValues(name, value)

    if(check_result['alert']):
        try:
            logging.warning('Sending message request at http://webhook-eventsource-svc.argo-events:12001/notification ...')

            # get location inforamtion for all services
            location_r = requests.get("http://edgex-core-metadata:48081/api/v1/device")
            
            if location_r.status_code == 200:
                # select based on the name
                
                latitude, longitude, address_name = [(el['location']['Lat'], el['location']['Long'], el['location']['Address']) for el in location_r.json() if el['name'] == device][0]
                

            else:
                raise Exception("No device found.") 
            
            # call argo
            r = requests.post("http://webhook-eventsource-svc.argo-events:12001/notification",
                headers={"Content-Type": "application/json"},
                json={"api":"http://meclocation.pi-edge-system.svc.cluster.local:8080/mec_platform/queries/closestUser",
                        "latitude": str(latitude),
                        "longitude": str(longitude),
                        "address":"None",
                        "user_type":"None",
                        "humidity":str(check_result['humidity']),
                        "temperature":str(check_result['temperature']),
                        "address_name": address_name,
                        "datetime": str(datetime)},
                timeout=3)
            logging.warning(' '.join([str(r.status_code), r.reason]))
        except:
            logging.warning(' '.join([str(location_r.status_code), location_r.reason]))
        



influxDBConnection = influxDBconnect()
logging.warning('Creating new instance ...')
client = mqtt.Client("sub1") #create new instance
logging.warning('Attaching function to callback ...')
client.on_message=on_message #attach function to callback
# client.username_pw_set("mqttUser", "mqttPass")
logging.warning('Connecting to broker  ...')
client.connect(broker_address, 1883) #connect to broker



client.loop_start()




while True:
    client.subscribe(topic)
    time.sleep(1)

client.loop_stop()
logging.warning('\n\n\nTHE END.')
