#!/usr/bin/env python

import rospy
import tf2_ros
import actionlib 
from move_base_msgs.msg import MoveBaseAction, MoveBaseGoal
from tf.transformations import quaternion_from_euler, euler_from_quaternion
import numpy as np

rospy.init_node("move_base_commander")

tfBuffer = tf2_ros.Buffer()
listener = tf2_ros.TransformListener(tfBuffer)

class MoveBaseCommander():

    def __init__(self):
        self.client = actionlib.SimpleActionClient('/locobot/move_base',MoveBaseAction)
        self.client.wait_for_server()

    def tf_listener():
        link1 = 'map'
        link2 = 'locobot/base_footprint'
        a = tfBuffer.lookup_transform(link1,link2, rospy.Time())
        
    def specify_target(self,x=0,y=0,z=0,rotation=-1.57):

        # Creates a new goal with the MoveBaseGoal constructor
        goal = MoveBaseGoal()
        goal.target_pose.header.frame_id = "map"
        goal.target_pose.header.stamp = rospy.Time.now()
        # Move 0.5 meters forward along the x axis of the "map" coordinate frame 
        goal.target_pose.pose.position.x = x
        goal.target_pose.pose.position.y = y
        goal.target_pose.pose.position.z = z
        # No rotation of the mobile base frame w.r.t. map frame

        roll = 0
        pitch = 0
        yaw = rotation
        x,y,z,w = quaternion_from_euler(roll,pitch,yaw)
        print(x,y,z,w)

        goal.target_pose.pose.orientation.x = x
        goal.target_pose.pose.orientation.y = y
        goal.target_pose.pose.orientation.z = z
        goal.target_pose.pose.orientation.w = w

        self.client.send_goal(goal)
        result = self.client.wait_for_result()
        print(result)
        
        return result
    
if __name__=='__main__':
    BaseCommander = MoveBaseCommander()
    BaseCommander.specify_target(x=0,y=0,rotation=1.57)