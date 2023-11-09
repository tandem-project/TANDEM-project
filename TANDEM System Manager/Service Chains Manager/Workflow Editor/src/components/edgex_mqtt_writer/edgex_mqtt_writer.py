import requests
import json
import logging
import argparse
from login import login


def edgex_mqtt_writer(custom_paas_file):
    
    
    token = login()

    with open(custom_paas_file, 'r') as f:
         custom_paas = json.load(f)

    url = "http://piedgecontroller.pi-edge-system:8080/piedge-connector/2.0.0/deployServiceFunction"
    logging.warning("check1")
    payload = json.dumps({
    "service_function_name": "app-service-configurable-mqtt",
    "service_function_instance_name": custom_paas['paas_instance_name']+'-mqtt-writer',
    "count_min": custom_paas['count_min'],
    "count_max": custom_paas['count_max'],
    "location": custom_paas['location'],
    "autoscaling_metric": "cpu",
    "autoscaling_policy": custom_paas["autoscaling_type"],
    "env_parameters": [
        {
        "value": "events",
        "name": "Binding_PublishTopic"
        },
        {
        "value": "edgex-core-command",
        "name": "Clients_Command_Host"
        },
        {
        "value": "edgex-core-data",
        "name": "Clients_CoreData_Host"
        },
        {
        "value": "edgex-core-data",
        "name": "Clients_Data_Host"
        },
        {
        "value": "edgex-core-metadata",
        "name": "Clients_Metadata_Host"
        },
        {
        "value": "edgex-support-notifications",
        "name": "Clients_Notifications_Host"
        },
        {
        "value": "edgex-kuiper",
        "name": "Clients_RulesEngine_Host"
        },
        {
        "value": "edgex-support-scheduler",
        "name": "Clients_Scheduler_Host"
        },
        {
        "value": "edgex-redis",
        "name": "Databases_Primary_Host"
        },
        {
        "value": "false",
        "name": "EDGEX_SECURITY_SECRET_STORE"
        },
        {
        "value": "60",
        "name": "EDGEX_STARTUP_DURATION"
        },
        {
        "value": "false",
        "name": "Logging_EnableRemote"
        },
        {
        "value": "edgex-core-data",
        "name": "MessageBus_SubscribeHost_Host"
        },
        {
        "value": "edgex-core-consul",
        "name": "Registry_Host"
        },
        {
        "value": "localhost",
        "name": "Service_Host"
        },
        {
        "value": "48101",
        "name": "Service_Port"
        },
        {
        "value": custom_paas['paas_instance_name']+'-mqtt',
        "name": "WRITABLE_PIPELINE_FUNCTIONS_MQTTSEND_ADDRESSABLE_ADDRESS"
        },
        {
        "value": "1883",
        "name": "WRITABLE_PIPELINE_FUNCTIONS_MQTTSEND_ADDRESSABLE_PORT"
        },
        {
        "value": "tcp",
        "name": "WRITABLE_PIPELINE_FUNCTIONS_MQTTSEND_ADDRESSABLE_PROTOCOL"
        },
        {
        "value": "edgex-tutorial",
        "name": "WRITABLE_PIPELINE_FUNCTIONS_MQTTSEND_ADDRESSABLE_TOPIC"
        },
        {
        "value": "true",
        "name": "WRITABLE_PIPELINE_FUNCTIONS_MQTTSEND_PARAMETERS_AUTORECONNECT"
        },
        {
        "value": "false",
        "name": "WRITABLE_PIPELINE_FUNCTIONS_MQTTSEND_PARAMETERS_PERSISTONERROR"
        },
        {
        "value": "true",
        "name": "WRITABLE_PIPELINE_FUNCTIONS_MQTTSEND_PARAMETERS_RETAIN"
        },
        {
        "value": "mqtt-export",
        "name": "edgex_profile"
        }
    ]
    })
    logging.warning("check2")
    
    headers = {
    'Authorization': f'Bearer {token}',
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    logging.warning(response.text)

parser = argparse.ArgumentParser(description='command line arguments for edgex mqtt writer.')


parser.add_argument('--custom_paas_file', type=str)
args = parser.parse_args()

if __name__ == '__main__':
	edgex_mqtt_writer(args.custom_paas_file)