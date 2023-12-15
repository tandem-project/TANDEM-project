curl --location 'http://10.152.183.214:5000/convert' \
--header 'Content-Type: application/json' \
--data '{
    "components": [
        {
            "name": "robot_device1",
            "type": "robot_device",
            "dependencies": [],
            "parameters": {
                "input_from_prev":{
                },
                "input_from_user":{
                    "device_name": "robottandemdevice1"
                }
            }
        }
    ]
}'