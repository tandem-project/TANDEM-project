#!/usr/bin/env python3
import sys
import copy
import rospy
import tf2_ros
import moveit_commander
import moveit_msgs.msg
import geometry_msgs.msg
## Import msgs and srvs ##
from std_msgs.msg import Float64
from geometry_msgs.msg import Pose
from sensor_msgs.msg import JointState
from tf.transformations import quaternion_from_euler, euler_from_quaternion
from moveit_commander.conversions import pose_to_list
import numpy as np
import rospy
import actionlib 
from move_base_msgs.msg import MoveBaseAction, MoveBaseGoal


class Controller(object):
  def __init__(self):
    """
    Initialize MoveIt communication with the Robot
    """
    moveit_commander.roscpp_initialize(sys.argv)
    rospy.init_node('moveit_python_interface')

    self.client = actionlib.SimpleActionClient('/locobot/move_base',MoveBaseAction)
    # self.client.wait_for_server()

    ## Get the name of the robot - this will be used to properly define the end-effector link when adding a box
    
    self.robot_model = 'locobot_wx200'
    self.robot_name = self.robot_model

    ## Instantiate a `RobotCommander`_ object. This object is the outer-level interface to the robot:
    self.robot = moveit_commander.RobotCommander()

    ## Instantiate a `PlanningSceneInterface`_ object.  This object is an interface to the world surrounding the robot:
    self.scene = moveit_commander.PlanningSceneInterface()
    # self.scene.addBox(name='camera',size_x=0.2,size_y=0.2,size_z=0.2,x=0,y=0,z=0.6)

    group_name = "interbotix_arm"
    group_name2 = "interbotix_gripper"
    self.group = moveit_commander.MoveGroupCommander(group_name)
    self.group2 = moveit_commander.MoveGroupCommander(group_name2)
    self.group.set_max_velocity_scaling_factor(value=1)
    self.group2.set_max_acceleration_scaling_factor(value=1)

    # self.group.allow_replanning(True)
    # self.group.set_goal_tolerance(0.005)
    # self.group.set_num_planning_attempts(planning_attempts)
    self.group.set_planning_time(5)
    
    ## We create a `DisplayTrajectory`_ publisher which is used later to publish
    ## trajectories for RViz to visualize:
    self.display_trajectory_publisher = rospy.Publisher("move_group/display_planned_path",
                                                   moveit_msgs.msg.DisplayTrajectory,
                                                   queue_size=20)
    # self.camera_tilt_publisher = rospy.Publisher(f"/{self.robot_name}/tilt_controller/command",Float64,queue_size=20)
    self.camera_tilt_publisher = rospy.Publisher("/locobot/tilt_controller/command",Float64,queue_size=20)

    ## Getting Basic Information
    # We can get the name of the reference frame for this robot:
    self.planning_frame = self.group.get_planning_frame()
    # We can also print the name of the end-effector link for this group:
    self.eef_link = self.group.get_end_effector_link()
    # We can get a list of all the groups in the robot:
    self.group_names = self.robot.get_group_names()

    self.pick_command = None
    self.place_command = None

    self.tasks = [] # [id, grasp_pose, place_pose, done,attempts]
    self.ptr = {} # { id: ptr_to_tasks_list }


    self.tfBuffer = tf2_ros.Buffer()
    listener = tf2_ros.TransformListener(self.tfBuffer)

  def add_floor_plane(self,surface_height):

    floor_pose = geometry_msgs.msg.PoseStamped()
    floor_pose.header.frame_id = self.robot.get_planning_frame()
    floor_pose.pose.position.x = 0.0
    floor_pose.pose.position.y = 0.0
    floor_pose.pose.position.z = surface_height
    floor_pose.pose.orientation.w = 1.0
    self.scene.add_plane("floor",floor_pose,normal=(0,0,1))
    
    return
  
  def get_gripper_yaw(self,x,y,x0,y0):

    if ((x-x0)<0 and (y-y0)>0):
        theta = np.pi - np.arctan(-(y-y0)/(x-x0))
    elif ((x-x0)<0 and (y-y0)<0):
        theta = -np.pi + np.arctan((y-y0)/(x-x0))
    else:
        if x == 0: return np.arctan(np.inf)
        theta = np.arctan((y-y0)/(x-x0))
    return theta

  def set_gripper_width(self,halfwidth):
    a = self.group2.get_current_joint_values()
    self.group2.set_joint_value_target([halfwidth,-halfwidth])
    self.group2.go(wait=True)

    return 

  def go_to_named_pose(self,pose_name,group):

    # # Get the current robot state
    # current_state = self.robot.get_current_state()
    # # Set the start state to the current robot state
    # self.group.set_start_state(current_state)

    group.set_named_target(pose_name)

    plan = group.plan()
    trajectory_in = plan[1]
    ref_state_in = self.robot.get_current_state()
    trajectory_ = group.retime_trajectory(ref_state_in,trajectory_in,1) # make the trajectory faster    
    group.execute(trajectory_)
    
    # plan = group.go(wait=True)

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
    return self.all_close(self.joint_goal, current_joints, 0.1)

  def go_to_pose_goal(self):

    # Get the current robot state
    current_state = self.robot.get_current_state()
    # Set the start state to the current robot state
    self.group2.set_start_state(current_state)
    
    ## We can plan a motion for this group to a desired pose for the end-effector:
    self.group.set_pose_target(self.pose_goal)
    ## Now, we call the planner to compute the plan and execute it.

    plan = self.group.plan()
    trajectory_in = plan[1]
    ref_state_in = self.robot.get_current_state()
    trajectory_ = self.group.retime_trajectory(ref_state_in,trajectory_in,1) # make the trajectory faster    
    self.group.execute(trajectory_)
    # self.group.go(wait=True)

    # Calling `stop()` ensures that there is no residual movement
    self.group.stop()
    # It is always good to clear your targets after planning with poses.
    # Note: there is no equivalent function for clear_joint_value_targets()
    self.group.clear_pose_targets()

    current_pose = self.group.get_current_pose().pose
    
    all_close = self.all_close(self.pose_goal, current_pose, 0.05)
    
    print("ALL CLOSE:",all_close)
    return all_close

  def go_to_defined_pose(self, msg):
      self.set_command_status(msg.command_id)

      target_pose = msg.target_pose # pose_quat

      self.set_pose_goal_quat(target_pose)
      self.group.set_pose_target(self.pose_goal)

      success = self.go_to_pose_goal()
      success = True
      self.set_command_status(msg.command_id,completed=True,success=success)

      return success
  
  def pose_euler2quaternion(self,pose_euler):
      quat = quaternion_from_euler(pose_euler[3], pose_euler[4], pose_euler[5])
      pose = geometry_msgs.msg.Pose()
      pose.position.x = pose_euler[0]
      pose.position.y = pose_euler[1]
      pose.position.z = pose_euler[2]
      pose.orientation.x = quat[0]
      pose.orientation.y = quat[1]
      pose.orientation.z = quat[2]
      pose.orientation.w = quat[3]
      return pose
  
  def all_close(self,goal, actual, tolerance):
    """
    Convenience method for testing if a list of values are within a tolerance of their counterparts in another list
    @param: goal       A list of floats, a Pose or a PoseStamped
    @param: actual     A list of floats, a Pose or a PoseStamped
    @param: tolerance  A float
    @returns: bool
    """
    all_equal = True
    if type(goal) is list:
      for index in range(len(goal)):
        if abs(actual[index] - goal[index]) > tolerance:
          return False

    elif type(goal) is geometry_msgs.msg.PoseStamped:
      return self.all_close(goal.pose, actual.pose, tolerance)

    elif type(goal) is geometry_msgs.msg.Pose:
      return self.all_close(pose_to_list(goal), pose_to_list(actual), tolerance)

    return True

  def move_base_command(self,x=-1,y=-1,rotation=0):

      goal = MoveBaseGoal()
      goal.target_pose.header.frame_id = "map"
      goal.target_pose.header.stamp = rospy.Time.now()

      goal.target_pose.pose.position.x = x
      goal.target_pose.pose.position.y = y
      # goal.target_pose.pose.position.z = z

      x,y,z,w = quaternion_from_euler(0,0,rotation)

      goal.target_pose.pose.orientation.x = x
      goal.target_pose.pose.orientation.y = y
      goal.target_pose.pose.orientation.z = z
      goal.target_pose.pose.orientation.w = w

      self.client.send_goal(goal)

      res = self.client.wait_for_result()
      return res

  def set_camera_for_manipulation(self):
    self.camera_tilt_publisher.publish(0.7)
  
  def control_motor_angles(self, desired_angles):
    self.group.set_joint_value_target(desired_angles)
    plan = self.group.plan()[1]
    self.group.execute(plan, wait=True)

  def update_pick_command(self,msg):
    print("&"*20)
    self.pick_command = msg
    print("Pick Command Received")

  def pick_and_place_routine(self,msg):
    print("%"*20)
    self.place_command = msg

    if self.pick_command and not self.pick_command.id == msg.id: 
      print("Something was lost")
      return
    print("Place Command Received")
   
    grasp_pose = self.pick_command.grasp_pose.pose
    place_pose = self.place_command.place_pose.pose

    id = str(round(grasp_pose.position.x,2)).replace('.','')+str(round(grasp_pose.position.y,2)).replace('.','')
    # id = msg.id
    task = [id,grasp_pose,place_pose,False,0]
    
    if (id not in self.ptr): # if has not tried that task before
      self.tasks.append(task)
      self.ptr[id] = len(self.tasks)-1
    if self.tasks[self.ptr[id]][3] == True: # done or not
        return

    # if new task, do this
    success = self.pick_and_place(id)
    return
    
    if success: return
    

    # SECOND TRY #

    # make gripper grasping pose parallel to the floor

    pick_command = self.pick_command
    # pick_command.id = pick_command.id + "_2"
    grasp_pose = pick_command.grasp_pose.pose

    r,p,y = euler_from_quaternion((grasp_pose.orientation.x,grasp_pose.orientation.y,grasp_pose.orientation.z,grasp_pose.orientation.w))
    x,y,z,w = quaternion_from_euler(r,0,y)    
    grasp_pose.orientation.x = x
    grasp_pose.orientation.y = y
    grasp_pose.orientation.z = z
    grasp_pose.orientation.w = w  

    pick_command.grasp_pose.pose = grasp_pose

    # make gripper place pose parallel to the floor

    place_command = self.place_command
    # place_command.id = place_command.id + "_2"
    place_pose = place_command.grasp_pose.pose

    r,p,y = euler_from_quaternion((place_pose.orientation.x,place_pose.orientation.y,place_pose.orientation.z,place_pose.orientation.w))
    x,y,z,w = quaternion_from_euler(r,0,y)    
    place_pose.orientation.x = x
    place_pose.orientation.y = y
    place_pose.orientation.z = z
    place_pose.orientation.w = w  

    place_command.grasp_pose.pose = place_pose

    task = [id,grasp_pose,place_pose,False,0]
    

    return

  def pick_and_place(self,task_id=-1):
    x0, y0,z0 ,_ ,_ ,_ = self.base_frame # Arm's base position relative to (0,0,0)

    # if task_if==-1, we have to sample a task from the list self.tasks
    if task_id != -1: 
      ptr = self.ptr[task_id]
      [id,grasp_pose,place_pose,done,attempts] = self.tasks[ptr]
    else:
      for i in range(len(self.tasks)):
        [id,grasp_pose,place_pose,done,attempts] = self.tasks[i]
        if done or ( not done and attempts>1): return
        if not done and attempts==0:
          task_id = id 
          break
        if not done and attempts==1:
          task_id = id
          grasp_pose.position.x += 0.01
          grasp_pose.position.y += 0.01
          break
      task_id = id  

    print("&"*200)
    print("TASKS LIST:")
    for i in range(len(self.tasks)):
      print(f"ID: {self.tasks[i][0]}, X: {self.tasks[i][1].position.x}, Y: {self.tasks[i][1].position.y}, DONE: {self.tasks[i][3]}, ATTEMPTS: {self.tasks[i][4]}")

    above_target = Pose()
    above_target.position.x = grasp_pose.position.x
    above_target.position.y = grasp_pose.position.y
    above_target.position.z = grasp_pose.position.z + 0.1
    above_target.orientation = grasp_pose.orientation

    above_target2 = Pose()
    above_target2.position.x = grasp_pose.position.x - 0.1
    above_target2.position.y = grasp_pose.position.y
    above_target2.position.z = grasp_pose.position.z + 0.15
    r,p,y = euler_from_quaternion((grasp_pose.orientation.x,grasp_pose.orientation.y,grasp_pose.orientation.z,grasp_pose.orientation.w))
    yaw = self.get_gripper_yaw(above_target2.position.x,above_target2.position.y,x0,y0)
    x,y,z,w = quaternion_from_euler(r,0,yaw)    
    above_target2.orientation.x = x
    above_target2.orientation.y = y
    above_target2.orientation.z = z
    above_target2.orientation.w = w  

    object_attached = False

    moved = False
    print("Go above target object")
    self.set_pose_goal_quat(above_target)

    if self.go_to_pose_goal():
      moved = True
      print("Open Gripper")
      if self.go_to_named_pose("Open",group=self.group2):
        print("Going to grasp pose")

        print("Go to grasping position")
        self.set_pose_goal_quat(grasp_pose)
        if self.go_to_pose_goal():

          print("Attach object to gripper")
          # attach object to gripper in scene
          touch_links = self.robot.get_link_names(group=self.group2.get_name())
          object_name = task_id
          self.scene.attach_box(self.eef_link,object_name,touch_links=touch_links)
          object_attached = True

          print("Close Gripper")
          if self.grasp_object():

            print("Raise object")
            self.set_pose_goal_quat(above_target)
            if self.go_to_pose_goal():

              # this is to ensure collision avoidance because we have made our obstacles too thin
              self.add_obstacles_width()

              print("Further raise object to avoid other objects")
              self.set_pose_goal_quat(above_target2)
              if True: #self.go_to_pose_goal():
                # while True:
                #   pass 

                print("Go to place pose")  
                self.set_pose_goal_quat(place_pose)
                if self.go_to_pose_goal():

                  print('Open Gripper')
                  if self.go_to_named_pose("Open",group=self.group2):

                    print("Detach object from Gripper")
                    self.scene.remove_attached_object(self.eef_link,name=object_name)
                    object_attached = False

                    print("Go slightly above object")
                    above_place = place_pose
                    above_place.position.z += 0.08
                    self.set_pose_goal_quat(above_place)
                    if self.go_to_pose_goal():

                      print("Pick n Place Routine Complete!")
                      done = True
                      self.go_to_named_pose("Home",group=self.group)
                      self.go_to_named_pose("Sleep",group=self.group)

                      for temp_obj_name in self.temp_objects:
                        self.scene.remove_world_object(temp_obj_name)
                else:
                  self.set_pose_goal_quat(grasp_pose)
                  self.go_to_pose_goal()
                  self.go_to_named_pose("Open",group=self.group2)        
                  
    if not done: 
        print("Pick n Place Routine Failed!")
        if object_attached:
          self.scene.remove_attached_object(self.eef_link,name=object_name)
        if moved: self.go_to_named_pose("Sleep",group=self.group)
        for temp_obj_name in self.temp_objects:
          self.scene.remove_world_object(temp_obj_name)
    
    self.tasks[self.ptr[task_id]][3] = done
    self.tasks[self.ptr[task_id]][4] += 1

    return done

  def check_grasp(self):
    msg = rospy.wait_for_message("/locobot/joint_states", JointState, timeout=1)
    gripper_index = 7
    gripper_effort = np.abs(msg.effort[gripper_index])
    print("GRIPPER EFFORT",gripper_effort)
    if gripper_effort < 90:    
        return False
    return True

  def grasp_object(self):
    success = self.go_to_named_pose("Redbull",group=self.group2)
    if not self.check_grasp():
      return False
    return success

  def plan_cartesian_path(self, x_dir=1, z_dir=1):
    ## Cartesian Paths
    ## ^^^^^^^^^^^^^^^
    ## You can plan a Cartesian path directly by specifying a list of waypoints
    ## for the end-effector to go through:
    ##
    waypoints = []

    wpose = self.group.get_current_pose().pose
    wpose.position.z += z_dir * 0.1  # First move up (z)
    waypoints.append(copy.deepcopy(wpose))

    wpose.position.x += x_dir * 0.1  # Second move forward in (x)
    waypoints.append(copy.deepcopy(wpose))

    wpose.position.z -= z_dir * 0.1  # Third move down (z)
    waypoints.append(copy.deepcopy(wpose))

    # We want the Cartesian path to be interpolated at a resolution of 1 cm
    # which is why we will specify 0.01 as the eef_step in Cartesian
    # translation.  We will disable the jump threshold by setting it to 0.0 disabling:
    (plan, fraction) = self.group.compute_cartesian_path(
                                       waypoints,   # waypoints to follow
                                       0.01,        # eef_step
                                       0.0)         # jump_threshold

    # Note: We are just planning, not asking move_group to actually move the robot yet:
    return plan, fraction

  def display_trajectory(self, plan):
    ## Displaying a Trajectory
    ## ^^^^^^^^^^^^^^^^^^^^^^^
    ## You can ask RViz to visualize a plan (aka trajectory) for you. But the
    ## group.plan() method does this automatically so this is not that useful
    ## here (it just displays the same trajectory again):
    ##
    ## A `DisplayTrajectory`_ msg has two primary fields, trajectory_start and trajectory.
    ## We populate the trajectory_start with our current robot state to copy over
    ## any AttachedCollisionObjects and add our plan to the trajectory.
    display_trajectory = moveit_msgs.msg.DisplayTrajectory()
    display_trajectory.trajectory_start = self.robot.get_current_state()
    display_trajectory.trajectory.append(plan)
    # Publish
    self.display_trajectory_publisher.publish(display_trajectory)

  def transformation_listener(self,link1='locobot/base_footprint',link2='locobot/camera_link'):
    tran = 1
    done = False
    while not done:
      try:
        tran = self.tfBuffer.lookup_transform(link1,link2, rospy.Time())
        done = True
      except:
        pass

    translation = tran.transform.translation
    translation = [translation.x,translation.y,translation.z]

    rotation = tran.transform.rotation
    quaternions = [rotation.x, rotation.y, rotation.z, rotation.w]
    rotation_euler = euler_from_quaternion(quaternions)

    return translation, rotation_euler


if __name__ == '__main__':
  controller = Controller()
  controller.set_gripper_width(0.020)

  while True:
    rospy.spin()
    rospy.sleep(1)
