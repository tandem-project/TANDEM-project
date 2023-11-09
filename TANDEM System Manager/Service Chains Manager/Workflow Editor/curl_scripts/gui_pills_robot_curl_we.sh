curl --location 'http://localhost:8080/convert' \
--header 'Content-Type: application/json' \
--data '{
  "components": [
    {
      "name": "hw_controller2",
      "type": "hw_controller",
      "dependencies": [],
      "parameters": {
        "input_from_prev": {},
        "input_from_user": {}
      }
    },
    {
      "name": "motion_planning3",
      "type": "motion_planning",
      "dependencies": [
        "hw_controller2"
      ],
      "parameters": {
        "input_from_prev": {},
        "input_from_user":
          {
            "ROS_MASTER_URI": "http://hardware_controller:11311"
          }
      }
    },
    {
      "name": "object_detection_pills5",
      "type": "object_detection_pills",
      "dependencies": [],
      "parameters": {
        "input_from_prev": {},
        "input_from_user":
          {}
      }
    },
    {
      "name": "pick_n_place7",
      "type": "pick_n_place",
      "dependencies": [
        "motion_planning3"
      ],
      "parameters": {
        "input_from_prev": {},
        "input_from_user":
          {
            "ROS_MASTER_URI": "http://hardware_controller:11311",
            "OBJDET_SERVER": "http://object-detection:1821/inference"
          }
      }
    }
  ]
}'