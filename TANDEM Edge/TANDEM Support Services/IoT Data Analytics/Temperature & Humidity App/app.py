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

    timestamp_now = str(datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'))
    print(timestamp_now)

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
    #print(obj)
    # current date and time
    ##timestamp = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')

    # Extract the data from each sensor, even if the MQTT message contain multiple entries

    curr_id = obj.get("id")

    if curr_id == prev_id:
        return
    else:

        for entry in obj["readings"]:
            print(type(entry["origin"]))
            print("Sensor: %s: Reading: %s" % (entry["name"], entry["value"]) )
            print(datetime.datetime.fromtimestamp(entry["origin"] // 1000000000))
            device      = entry["device"]
            sensorName  = entry["name"]
            sensorValue = entry["value"]
            timestamp = str(datetime.datetime.fromtimestamp(entry["origin"] // 1000000000))
        # Write data to influxDB
            influxDBwrite(device, sensorName, sensorValue, timestamp)
            send_alert(sensorName, sensorValue, entry["origin"])
        prev_id = curr_id


def send_alert(name, value, timestamp):
    print('Evaluating rule...')
    if(name == "humidity" and int(value) > 80):
        try:
            #print('Sending alarm request at http://146.124.106.209:12000/alarm ...')
            #print('Sending alarm request at http://webhook-eventsource-svc.argo-events.svc.cluster.local:12000/alarm ...')
            print('Sending message request at http://webhook-eventsource-svc.argo-events.svc.cluster.local:12000/notification ...')
            r = requests.post("http://webhook-eventsource-svc.argo-events.svc.cluster.local:12000/notification", json={"humidity": value, "timestamp": timestamp}, timeout=3)
            #r = requests.post("http://webhook-eventsource-svc.argo-events.svc.cluster.local:12000/alarm", json={"humidity": value, "timestamp": timestamp}, timeout=3)
            print(r.status_code, r.reason)
        except:
            print(r.status_code, r.reason)
        
        if (int(value) > 90):
            try:
                print('Sending message request at http://webhook-eventsource-svc.argo-events.svc.cluster.local:12000/alarm ...')
                #r = requests.post("http://webhook-eventsource-svc.argo-events.svc.cluster.local:12000/alarm", json={"humidity": value, "timestamp": timestamp}, timeout=3)
                r = requests.post("http://webhook-eventsource-svc.argo-events.svc.cluster.local:12000/alarm", json={"duration": 10}, timeout=3)
                print(r.status_code, r.reason)
            except:
                print(r.status_code, r.reason)



influxDBConnection = influxDBconnect()

print("Creating new instance ...")
client = mqtt.Client("sub1") #create new instance
client.on_message=on_message #attach function to callback
# client.username_pw_set("mqttUser", "mqttPass")

print("Connecting to broker ...")
client.connect(broker_address, 1883) #connect to broker
print("...done")

client.loop_start()



while True:
    client.subscribe(topic)
    time.sleep(1)

client.loop_stop()
