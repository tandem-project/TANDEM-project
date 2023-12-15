#!/usr/bin/env python3
import math
import sys
import copy
import rospy
import tf2_ros
import random
import time
import moveit_commander
import moveit_msgs.msg
import geometry_msgs.msg
## Import msgs and srvs ##
from moveit_msgs.msg import Grasp, PlaceLocation
from std_msgs.msg import String, Float64, Header
from geometry_msgs.msg import Pose,PoseStamped
from trajectory_msgs.msg import JointTrajectoryPoint
from moveit_msgs.msg import DisplayTrajectory, Grasp, PlaceLocation
from moveit_msgs.srv import ApplyPlanningScene
from math import pi
from six.moves import input
from std_msgs.msg import String
from tf.transformations import quaternion_from_euler, euler_from_quaternion
from moveit_commander.conversions import pose_to_list
import numpy as np
import rospy
from sensor_msgs.msg import LaserScan
import socket, pickle
import actionlib 
from move_base_msgs.msg import MoveBaseAction, MoveBaseGoal


class Controller(object):
  def __init__(self):
    """
    Initialize MoveIt communication with the Robot
    """
    moveit_commander.roscpp_initialize(sys.argv)
    rospy.init_node('moveit_python_interface')

    self.robot_model = 'locobot_wx200'
    self.robot_name = self.robot_model

    self.robot = moveit_commander.RobotCommander()

    ## Instantiate a `PlanningSceneInterface`_ object.  This object is an interface to the world surrounding the robot:
    self.scene = moveit_commander.PlanningSceneInterface()

    group_name = "interbotix_arm"
    group_name2 = "interbotix_gripper"
    self.group = moveit_commander.MoveGroupCommander(group_name)
    self.group2 = moveit_commander.MoveGroupCommander(group_name2)
    self.group.set_max_velocity_scaling_factor(value=0.5)

    ## We create a `DisplayTrajectory`_ publisher which is used later to publish
    ## trajectories for RViz to visualize:
    self.display_trajectory_publisher = rospy.Publisher("move_group/display_planned_path",
                                                   moveit_msgs.msg.DisplayTrajectory,
                                                   queue_size=20)
    ## Getting Basic Information
    # We can get the name of the reference frame for this robot:
    self.planning_frame = self.group.get_planning_frame()
    # We can also print the name of the end-effector link for this group:
    self.eef_link = self.group.get_end_effector_link()
    # We can get a list of all the groups in the robot:
    self.group_names = self.robot.get_group_names()



  def go_to_named_pose(self,pose_name,group):
    group.set_named_target(pose_name)
    plan = group.go(wait=True)
    group.stop()
    group.clear_pose_targets()
    return True

  def set_pose_goal(self,pose_euler):
      pose_quat = self.pose_euler2quaternion(pose_euler)
      self.pose_goal = pose_quat

  def set_pose_goal_quat(self,pose_quat):
      self.pose_goal = pose_quat

  def go_to_joint_goal(self):
    ## Planning to a Joint Goal

    # The go command can be called with joint values, poses, or without any
    # parameters if you have already set the pose or joint target for the group
    self.group.go(self.joint_goal, wait=True)
    # Calling ``stop()`` ensures that there is no residual movement
    self.group.stop()

    current_joints = self.group.get_current_joint_values()
    return self.all_close(self.joint_goal, current_joints, 0.01)

  def go_to_pose_goal(self):
    ## We can plan a motion for this group to a desired pose for the end-effector:

    self.group.set_pose_target(self.pose_goal)
    ## Now, we call the planner to compute the plan and execute it.
    plan = self.group.go(wait=True)
    # Calling `stop()` ensures that there is no residual movement
    self.group.stop()
    # It is always good to clear your targets after planning with poses.
    # Note: there is no equivalent function for clear_joint_value_targets()
    self.group.clear_pose_targets()

    current_pose = self.group.get_current_pose().pose
    return self.all_close(self.pose_goal, current_pose, 0.03)

  def go_to_defined_pose(self, msg):
      self.set_command_status(msg.command_id)

      target_pose = msg.target_pose # pose_quat

      self.set_pose_goal_quat(target_pose)
      self.group.set_pose_target(self.pose_goal)

      success = self.go_to_pose_goal()
      success = True
      self.set_command_status(msg.command_id,completed=True,success=success)

      return success
  
  def control_motor_angles(self, desired_angles):
    self.group.set_joint_value_target(desired_angles)
    plan = self.group.plan()[1]
    self.group.execute(plan, wait=True)


  def set_gripper_width(self,halfwidth):
    a = self.group2.get_current_joint_values()
    self.group2.set_joint_value_target([halfwidth,-0.025])
    self.group2.go(wait=True)

    return
if __name__ == '__main__':
  controller = Controller()

  
  controller.set_gripper_width(0.034) 
  controller.set_gripper_width(0.023)
  
  a = controller.group2.get_current_joint_values()
  print(a)
  
#  while True:
#    rospy.spin()
#    rospy.sleep(1)
