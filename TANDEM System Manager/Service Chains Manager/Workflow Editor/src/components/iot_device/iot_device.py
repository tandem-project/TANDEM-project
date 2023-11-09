import requests
import json
import argparse
from login import login


def iot_device(device_name, values_file):
    

    token = login()

    values = [
    {
        "name": "temperature",
        "description": "Ambient temperature in Celsius.",
        "type": "Int64",
        "min": 0,
        "max": 100
    },
    {
        "name": "humidity",
        "description": "Humidity in %.",
        "type": "Int64",
        "min": 0,
        "max": 100
    }
]
    url = "http://piedgecontroller.pi-edge-system:8080/piedge-connector/2.0.0/addIotDevice"
    payload = json.dumps({
    "device_name": f"{device_name}",
    "description": "Raspberry Pi sensor cluster",
    "location": {
        "address":"Peania 19002",
        "lat": 37.94140197302559,
        "long":23.873110450922407
    },
    "device_cluster": "EnviromentSensorCluster",
    "values": values
    })
    headers = {
    'Authorization': f'Bearer {token}',
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

parser = argparse.ArgumentParser(description='command line arguments for iot device.')


parser.add_argument('--device_name', type=str)
parser.add_argument('--values_file', type=str)
args = parser.parse_args()

if __name__ == '__main__':
    iot_device(args.device_name, args.values_file)