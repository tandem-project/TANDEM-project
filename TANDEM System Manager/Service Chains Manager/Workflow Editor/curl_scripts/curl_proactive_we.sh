curl --location 'http://10.152.183.214:5000/convert' \
--header 'Content-Type: application/json' \
--data '{
    "components": [
        {
            "name": "iot_device1",
            "type": "iot_device_proactive",
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
            "name": "iot_device2",
            "type": "iot_device_proactive",
            "dependencies": [],
            "parameters": {
                "input_from_prev":{
                },
                "input_from_user":{
                    "device_name": "tandemdevice2"
                }
            }
        },
        {
            "name": "iot_device3",
            "type": "iot_device_proactive",
            "dependencies": [],
            "parameters": {
                "input_from_prev":{
                },
                "input_from_user":{
                    "device_name": "tandemdevice3"
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

        },
        {
            "name": "notification1",
            "type": "notification",
            "dependencies": ["iot_device2"],
            "parameters": {
                "input_from_prev":{
                    "custom_paas_file":"iot_device2.output.output_path"
                },
                "input_from_user":{
                    "threshold":90
                }
            }

        }
    ]
}'
