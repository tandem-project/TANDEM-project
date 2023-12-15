The application consists of 4 Tandem services:

 - **Hardware Controller:**
    Includes the hardware drivers and the respective ROS wrappers. It accepts ation commands and publishes the robot's state at every moment.

 - **Motion Planning:**
    Receives target gripper coordinatres and plans a valid robot trajectory.

 - **Object Detection:**
    Receives a POST request with an image file and returns the predictions (detected objects' classes, bounding boxes, and confidence).

 - **Pick And Place:**
    Implements the Pick and Place algorithm step by step.

 Dockerfiles for all 4 services are included.

 In the installation directory we have the base robot code from interbotix, plus some robot specific configuration files

 The app directory contains the object detection flask server.