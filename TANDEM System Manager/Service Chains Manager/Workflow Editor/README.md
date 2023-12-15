# workflow editor

## Description
This project aims to create a tool that can recieve as an input a runtime workflow, consisted of a set of predefined components, to a set up workflow, that will set-up and connect all of the relevant services, taking into account all their dependencies.

### Install
For installing the Service Chains Manager use the YAML files found in Kubernetes folder of this directory. 

With the help of Kubernetes, type: 

```
kubectl apply -f workflow_editor_deployment.yaml -n admin 
```

And then we can see which pod is deployed with the following command:

```
kubectl -n admin get pods 
```

### Example

The service is now ready for use, where the endpoint 'convert' is stand-by for serving new requests with input in a JSON format. For example:

```
curl --location 'http://<service_ip>:5000/convert' \ 
--header 'Content-Type: application/json' \ 
--data '{ 
    "components": [ 
        { 
            "name": "iot_device1", 
            "type": "iot_device", 
            "dependencies": [], 
            "parameters": { 
                "input_from_prev":{ 
                }, 
                "input_from_user":{ 
                    "device_name": "tandemdevice1" 
                } 
            } 
        }, 
         { 
            "name": "notification", 
            "type": "notification", 
            "dependencies": ["iot_device1"], 
            "parameters": { 
                "input_from_prev":{ 
                    "custom_paas_file":"iot_device1.output.output_path" 
                }, 
                "input_from_user":{ 
                    "threshold":90 
                }
            }
        }
    ]
}'
```

In the sample example above a JSON message is used with two components, one IoT device (`iot_device`) and the notification service (`notification`), which depends on the aforementioned IoT device. Depending on the component, custom parameters and their respective values can be given as inputs.

