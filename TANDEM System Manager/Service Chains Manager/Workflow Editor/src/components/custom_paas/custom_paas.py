import requests
import json
import logging
from login import login
import argparse
from pathlib import Path


def custom_paas(paas_service_name, 
                       paas_instance_name,
                       autoscaling_type,
                       count_min,
                       count_max,
                       location,
                       all_node_ports,
                       output_path):


    token = login()

    url = "http://piedgecontroller.pi-edge-system:8080/piedge-connector/2.0.0/deployPaas"

    payload = json.dumps({
    "paas_service_name": paas_service_name,
    "paas_instance_name": paas_instance_name,
    "autoscaling_type": autoscaling_type,
    "count_min": int(count_min),
    "count_max": int(count_max),
    "location": location,
    "all_node_ports": bool(all_node_ports)
    })
    headers = {
    'Authorization': f'Bearer {token}',
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    logging.warning(response.text)

    output = {
    "paas_service_name": paas_service_name,
    "paas_instance_name": paas_instance_name,
    "autoscaling_type": autoscaling_type,
    "count_min": int(count_min),
    "count_max": int(count_max),
    "location": location,
    "webhook_name": paas_instance_name
    }

    with open(output_path, "w") as f:
        f.write(json.dumps(output))


parser = argparse.ArgumentParser(description='command line arguments for custom paas.')

parser.add_argument('--paas_service_name', type=str)
parser.add_argument('--paas_instance_name', type=str)
parser.add_argument('--autoscaling_type', type=str)
parser.add_argument('--count_min', type=str)
parser.add_argument('--count_max', type=str)
parser.add_argument('--location', type=str)
parser.add_argument('--all_node_ports', type=str)
parser.add_argument('--output_path', type=str)

args = parser.parse_args()

# Creating the directory where the output file is created.
Path(args.output_path).parent.mkdir(parents=True, exist_ok=True)


if __name__ == '__main__':
	custom_paas(args.paas_service_name, 
                       args.paas_instance_name,
                       args.autoscaling_type,
                       args.count_min,
                       args.count_max,
                       args.location,
                       args.all_node_ports,
                       args.output_path)