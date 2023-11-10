curl --location 'http://localhost:8080/convert' \
--header 'Content-Type: application/json' \
--data '{
    "components": [
        {
            "name": "hw_controller1",
            "type": "hw_controller",
            "dependencies": [],
            "parameters": {
                "input_from_prev":{
                },
                "input_from_user":{
                    "device_name": "tandemhwcontroller1"
                }
            }
        },
        {
            "name": "motion_planning1",
            "type": "motion_planning",
            "dependencies": ["hw_controller1"],
            "parameters": {
                "input_from_prev":{
                },
                "input_from_user":{
                    "device_name": "tandemmotionplanning1"
                }
            }
        },
        {
            "name": "object_detection1",
            "type": "object_detection",
            "dependencies": [],
            "parameters": {
                "input_from_prev":{
                },
                "input_from_user":{
                    "device_name": "tandemobjectdetection1"
                }
            }
        },
        {
            "name": "pick_n_place1",
            "type": "pick_n_place",
            "dependencies": ["motion_planning1"],
            "parameters": {
                "input_from_prev":{
                },
                "input_from_user":{
                    "device_name": "tandempicknplace1"
                }
            }
        }
    ]
}'