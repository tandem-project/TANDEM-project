#!/usr/bin/env python3

print("Camera stream.")

import numpy as np
import requests
import rospy
import cv2
import os
from sensor_msgs.msg import Image
from cv_bridge import CvBridge
import time
import matplotlib.pyplot as plt
from collections import deque
from subprocess import Popen, PIPE
import asyncio

bridge = CvBridge()
objdet_server = os.environ.get('OBJDET_SERVER')

predictions = []

async def objdet_request(cv_image):
    global predictions

    img_encoded = cv2.imencode(".jpg",cv_image)[1]
    file = {'file': ('image.jpg', img_encoded.tostring(), 'image/jpeg')}
    data = {"id" : "2345AB"}
    
    try:
        t0 = time.time()
        response = requests.post(objdet_server,files=file, data=data)
        inf_time = time.time()-t0
        status_code = response.status_code
        predictions = response.json()['predictions_list']
        
    except Exception as e:
        print(e)
        status_code = -1
        predictions = []
    
    print("PREDICTIONS:",predictions)  
    print("Object Detection Request Time:",inf_time)
    
    if status_code != 200:
        print("Object Detection Module Not Responding!")
        
    return predictions, status_code

def objdet_client(cv_image):
    global predictions
    
    img_encoded = cv2.imencode(".jpg",cv_image)[1]
    file = {'file': ('image.jpg', img_encoded.tostring(), 'image/jpeg')}
    data = {"id" : "2345AB"}
    
    try:
        t0 = time.time()
        
        response = requests.post(objdet_server,files=file, data=data)
        
        inference_time = time.time() - t0

        status_code = response.status_code
        print("Status code:",status_code)
        predictions = response.json()['predictions_list']
        print(predictions)
    except Exception as e:
        print(objdet_server)
        print(e)
        status_code = -1
        predictions = []
            
    if status_code != 200:
        print("Object Detection Module Not Responding!")
    return predictions, status_code

def listener():
    COLOR_IMAGE_TOPIC = '/locobot/camera/color/image_raw'
    instance = str(time.time())
    rospy.init_node("image_stream"+instance)
    rospy.Subscriber(COLOR_IMAGE_TOPIC,Image,callback)
    rospy.spin()

#export OBJDET_SERVER=http://10.1.162.150:1821/inference && python3 ~/interbotix_ws/src/interbotix_ros_rovers/interbotix_ros_xslocobots/examples/ntinos/scripts/camera_stream.py


def callback(img_msg,predict=True,plot=True):    
    global predictions

    img = bridge.imgmsg_to_cv2(img_msg, desired_encoding='bgr8')

    if predict:
        #asyncio.create_task(objdet_request(img))
        predictions_,response_status_code = objdet_client(img)

        for p in predictions:
            [x1,y1,x2,y2,obj_class] = p[0:5]
            color = (0,255,0)
            if obj_class in ['defective','tirosint']: 
                color = (0,0,255)
            img = cv2.rectangle(img, (x1, y1), (x2, y2), color, 2)
            position = (x1,y1-10)
            cv2.putText(
                img, #numpy array on which text is written
                obj_class, #text
                position, #position at which writing has to start
                cv2.FONT_HERSHEY_DUPLEX, #font family
                1, #font size
                color, #font color
                1) #font stroke
        predictions = []

    cv2.imshow('Robot POV',img)
    cv2.waitKey(1)


if __name__ == '__main__':
    #plt.ion()
    #plt.show()
    listener()
