#!/bin/bash

echo "export ROS_IP=$(echo `hostname -I | cut -d" " -f1`)" >> ~/.bashrc
export ROS_IP=$(echo `hostname -I | cut -d" " -f1`)
export WORKSPACE=/catkin_ws

echo hello world
sleep 8
set -e
source /catkin_ws/devel/setup.bash
roslaunch intrarobot motion_planning.launch robot_model:=locobot_wx200 use_actual:=true --wait