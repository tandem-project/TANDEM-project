import requests
import json
import logging
from login import login
import argparse
from pathlib import Path


def motion_planning_service_function(service_function_name, 
                       service_function_instance_name,
                       count_min,
                       count_max,
                       location,
                       output_path):


    token = login()

    url = "http://piedgecontroller.pi-edge-system:8080/piedge-connector/2.0.0/deployServiceFunction"

    payload = json.dumps({
    "service_function_name": service_function_name,
    "service_function_instance_name": service_function_instance_name,
    "count_min": int(count_min),
    "count_max": int(count_max),
    "location": location,
    "volume_mounts": [
         {
            "name": "devpath",
            "storage": "100Mi"
         }
    ],
    "autoscaling_metric": "cpu",
    "autoscaling_policy": "maximize-performance",
    "env_parameters": [
        {
            "value": "http://hardware-controller:11311",
            "name": "ROS_MASTER_URI"
        }
    ]
    })

    headers = {
    'Authorization': f'Bearer {token}',
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    logging.warning(response.text)

    output = {
    "service_function_name": service_function_name,
    "service_function_instance_name": service_function_instance_name,
    "count_min": int(count_min),
    "count_max": int(count_max),
    "location": location,
    "volume_mounts": [
         {
            "name": "devpath",
            "storage": "100Mi"
         }
    ],
    "autoscaling_metric": "cpu",
    "autoscaling_policy": "maximize-performance",
    "env_parameters": [
        {
            "value": "http://hardware-controller:11311",
            "name": "ROS_MASTER_URI"
        }
    ]

    }

    with open(output_path, "w") as f:
        f.write(json.dumps(output))


parser = argparse.ArgumentParser(description='command line arguments for custom paas.')

parser.add_argument('--service_function_name', type=str)
parser.add_argument('--service_function_instance_name', type=str)
parser.add_argument('--count_min', type=str)
parser.add_argument('--count_max', type=str)
parser.add_argument('--location', type=str)
parser.add_argument('--output_path', type=str)

args = parser.parse_args()

# Creating the directory where the output file is created.
Path(args.output_path).parent.mkdir(parents=True, exist_ok=True)


if __name__ == '__main__':
	motion_planning_service_function(args.service_function_name, 
                       args.service_function_instance_name,
                       args.count_min,
                       args.count_max,
                       args.location,
                       args.output_path)