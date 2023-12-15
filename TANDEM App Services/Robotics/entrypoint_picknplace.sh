#!/bin/bash

echo "export ROS_IP=$(echo `hostname -I | cut -d" " -f1`)" >> ~/.bashrc
export ROS_IP=$(echo `hostname -I | cut -d" " -f1`)
export WORKSPACE=/catkin_ws

echo hello world
sleep 13
set -e
source /catkin_ws/devel/setup.bash
rosrun intraRobot robot_controller3 __ns:=locobot
