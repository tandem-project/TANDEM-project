import requests
import json
import argparse



def deploy_event_source(k8s_token, custom_paas_file, event_name, image, webhook_name):

    url = "https://localhost:8080/apis/argoproj.io/v1alpha1/namespaces/argo-events/eventsources"

    payload = json.dumps({
    "apiVersion": "argoproj.io/v1alpha1",
    "kind": "EventSource",
    "metadata": {
        "name": f"{webhook_name}"
    },
    "spec": {
        "service": {
        "ports": [
            {
            "port": 12001,
            "targetPort": 12001
            }
        ]
        },
        "webhook": {
        f"{event_name}": {
            "port": "12001",
            "endpoint": "/notification",
            "method": "POST"
        }
        }
    }
    })
    headers = {
    'Authorization': f'Bearer {k8s_token}',
    'Content-Type': 'application/json'
    }

    return requests.request("POST", url, headers=headers, data=payload, verify=False)

def deploy_sensor(k8s_token, custom_paas_file, event_name, image, webhook_name):

    url = "https://localhost:8080/apis/argoproj.io/v1alpha1/namespaces/argo-events/sensors"

    payload = json.dumps({
    "apiVersion": "argoproj.io/v1alpha1",
    "kind": "Sensor",
    "metadata": {
        "name": f"{webhook_name}",
        "namespace": "argo-events"
    },
    "spec": {
        "template": {
        "serviceAccountName": "argo-events-sa"
        },
        "dependencies": [
        {
            "name": "notify1-dep",
            "eventSourceName": f"{webhook_name}",
            "eventName": f"{event_name}"
        }
        ],
        "triggers": [
        {
            "template": {
            "conditions": "notify1-dep",
            "name": "my-webhook1-workflow-trigger",
            "k8s": {
                "group": "argoproj.io",
                "version": "v1alpha1",
                "resource": "workflows",
                "operation": "create",
                "source": {
                "resource": {
                    "apiVersion": "argoproj.io/v1alpha1",
                    "kind": "Workflow",
                    "metadata": {
                    "generateName": "my-webhook-"
                    },
                    "spec": {
                    "entrypoint": "whalesay",
                    "arguments": {
                        "parameters": [
                        {
                            "name": "api",
                            "value": None
                        },
                        {
                            "name": "address",
                            "value": None
                        },
                        {
                            "name": "latitude",
                            "value": None
                        },
                        {
                            "name": "longitude",
                            "value": None
                        },
                        {
                            "name": "user_type",
                            "value": None
                        },
                        {
                            "name": "distance",
                            "value": None
                        },
                        {
                            "name": "humidity",
                            "value": None
                        },
                        {
                            "name": "temperature",
                            "value": None
                        },
                        {
                            "name": "datetime",
                            "value": None
                        },
                        {
                            "name": "address_name",
                            "value": None
                        }
                        ]
                    },
                    "templates": [
                        {
                        "name": "whalesay",
                        "inputs": {
                            "parameters": [
                            {
                                "name": "api"
                            },
                            {
                                "name": "address"
                            },
                            {
                                "name": "latitude"
                            },
                            {
                                "name": "longitude"
                            },
                            {
                                "name": "user_type"
                            },
                            {
                                "name": "distance"
                            },
                            {
                                "name": "humidity"
                            },
                            {
                                "name": "temperature"
                            },
                            {
                                "name": "datetime"
                            },
                            {
                                "name": "address_name"
                            }
                            ]
                        },
                        "container": {
                            "image": f"{image}",
                            "imagePullPolicy": "Always",
                            "command": [
                            "python3",
                            "notify_users.py"
                            ],
                            "args": [
                            "--api",
                            "{{inputs.parameters.api}}",
                            "--address",
                            "{{inputs.parameters.address}}",
                            "--latitude",
                            "{{inputs.parameters.latitude}}",
                            "--longitude",
                            "{{inputs.parameters.longitude}}",
                            "--user_type",
                            "{{inputs.parameters.user_type}}",
                            "--distance",
                            "{{inputs.parameters.distance}}",
                            "--humidity",
                            "{{inputs.parameters.humidity}}",
                            "--temperature",
                            "{{inputs.parameters.temperature}}",
                            "--datetime",
                            "{{inputs.parameters.datetime}}",
                            "--address_name",
                            "{{inputs.parameters.address_name}}"
                            ]
                        },
                        "nodeSelector": {
                            "location": "Peania_Athens_19002"
                        }
                        }
                    ]
                    }
                }
                },
                "parameters": [
                {
                    "src": {
                    "dependencyName": "notify1-dep",
                    "dataKey": "body.api"
                    },
                    "dest": "spec.arguments.parameters.0.value"
                },
                {
                    "src": {
                    "dependencyName": "notify1-dep",
                    "dataKey": "body.address"
                    },
                    "dest": "spec.arguments.parameters.1.value"
                },
                {
                    "src": {
                    "dependencyName": "notify1-dep",
                    "dataKey": "body.latitude"
                    },
                    "dest": "spec.arguments.parameters.2.value"
                },
                {
                    "src": {
                    "dependencyName": "notify1-dep",
                    "dataKey": "body.longitude"
                    },
                    "dest": "spec.arguments.parameters.3.value"
                },
                {
                    "src": {
                    "dependencyName": "notify1-dep",
                    "dataKey": "body.user_type"
                    },
                    "dest": "spec.arguments.parameters.4.value"
                },
                {
                    "src": {
                    "dependencyName": "notify1-dep",
                    "dataKey": "body.distance"
                    },
                    "dest": "spec.arguments.parameters.5.value"
                },
                {
                    "src": {
                    "dependencyName": "notify1-dep",
                    "dataKey": "body.humidity"
                    },
                    "dest": "spec.arguments.parameters.6.value"
                },
                {
                    "src": {
                    "dependencyName": "notify1-dep",
                    "dataKey": "body.temperature"
                    },
                    "dest": "spec.arguments.parameters.7.value"
                },
                {
                    "src": {
                    "dependencyName": "notify1-dep",
                    "dataKey": "body.datetime"
                    },
                    "dest": "spec.arguments.parameters.8.value"
                },
                {
                    "src": {
                    "dependencyName": "notify1-dep",
                    "dataKey": "body.address_name"
                    },
                    "dest": "spec.arguments.parameters.9.value"
                }
                ]
            }
            }
        }
        ]
    }
    })
    headers = {
    'Authorization': f'Bearer {k8s_token}',
    'Content-Type': 'application/json'
    }

    return requests.request("POST", url, headers=headers, data=payload, verify=False)

def webhook(custom_paas_file, event_name, image):
    k8s_token = "TVVGV1FJb3l0alNUOUdEeVRvbnZKdGhZS3FXUXg2aG5mMGVxekRqRnZhWT0K"

    
    with open(custom_paas_file, 'r') as f:
        webhook_name = json.load(f)['webhook_name']
    
    r1 = deploy_event_source(k8s_token, custom_paas_file, event_name, image, webhook_name)
    r2 = deploy_sensor(k8s_token, custom_paas_file, event_name, image, webhook_name)


parser = argparse.ArgumentParser(description='command line arguments for webhook.')

parser.add_argument('--custom_paas_file', type=str)
parser.add_argument('--event_name', type=str)
parser.add_argument('--image', type=str)
args = parser.parse_args()


if __name__ == '__main__':
    
    webhook(args.custom_paas_file, args.event_name, args.image)
