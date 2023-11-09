curl --location 'http://localhost:8080/convert' \
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