#!/usr/bin/env python3 

from ultralytics import YOLO
import cv2
import numpy as np
import os


weights = '/weights/best_nano_3.pt'
#weights = os.environ.get("WEIGHTS_PATH")


model = YOLO(weights)



"""
custom dataset rules
 - high variance 
   - types of objects
   - lighting
 - class balance
 - make data statistics script
 - not same objects in train and val sets
 - <10% examples without classes is ok
 - valid objects, but not labeled is not ok
 - consistency in annotation is a must
"""

"""
different input protocols

https live stream
subscription to ros topic
"""

def count_objects(image):
    # gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray = image
    blur = cv2.GaussianBlur(gray, (11, 11), 0)
    canny = cv2.Canny(blur, 30, 150, 3)
    dilated = cv2.dilate(canny, (1, 1), iterations=5) # with iterations=0 it detects more contours than expected
    (cnt, hierarchy) = cv2.findContours(dilated.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    return len(cnt),cnt

def get_objects_position(cv_image):
    # hsv format: hue, saturation, value (brightness)
    img_hsv=cv2.cvtColor(cv_image, cv2.COLOR_BGR2HSV)

    # lower red mask (0-10)
    lower_red = np.array([0,50,50])
    upper_red = np.array([8,255,255])
    red_mask0 = cv2.inRange(img_hsv, lower_red, upper_red)
    # upper red mask (170-180)
    lower_red = np.array([170,50,50])
    upper_red = np.array([180,255,255])
    red_mask1 = cv2.inRange(img_hsv, lower_red, upper_red)
    # join my masks
    red_mask =  red_mask0 # + red_mask1
    # lower green mask (hue 40-70)
    lower_green = np.array([40,40,40])
    upper_green = np.array([70,255,255])
    green_mask = cv2.inRange(img_hsv, lower_green, upper_green)
    # set my output img to zero everywhere except my mask
    output_img = cv_image.copy()
    only_reds = cv2.bitwise_and(output_img, output_img, mask=red_mask)
    only_greens = cv2.bitwise_and(output_img, output_img, mask=green_mask)

    filtered = only_reds + only_greens

    objects = []

    K_reds,cr = count_objects(only_reds)
    K_greens,cg = count_objects(only_greens)

    # cv2.imshow('Image',only_reds)
    # cv2.waitKey(0)
    # cv2.imshow('Image',only_greens)
    # cv2.waitKey(0)

    print("Red objects found:",K_reds)
    print("Green objects found:",K_greens)
    if K_reds > 0:
        gray = cv2.cvtColor(only_reds, cv2.COLOR_BGR2GRAY)
        red_points = []
        for i in range(gray.shape[0]):
            for j in range(gray.shape[1]):
                if gray[i,j]:
                    red_points.append(np.array([i,j]))
        red_points = np.float32(red_points)
        criteria = (cv2.TERM_CRITERIA_EPS, 10, 1.0)
        ret, label, center = cv2.kmeans(red_points, K_reds, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)

        for c in list(center):
            objects.append((c.round(),'red'))

    if K_greens > 0:
        gray = cv2.cvtColor(only_greens, cv2.COLOR_BGR2GRAY)
        green_points = []
        for i in range(gray.shape[0]):
            for j in range(gray.shape[1]):
                if gray[i,j]:
                    green_points.append(np.array([i,j]))
        green_points = np.float32(green_points)
        criteria = (cv2.TERM_CRITERIA_EPS, 10, 1.0)
        ret, label, center = cv2.kmeans(green_points, K_greens, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)

        for c in list(center):
            objects.append((c.round(),'green'))

    return objects

def color_object_detection(img):
    
    (X0,Y0) = img.shape[:2]
    detected_objects = []

    centers = get_objects_position(img)
    for center in centers:
        coords = center[0]
        y1 = int(max(coords[0]-30,0))
        y2 = int(min(coords[0]+30,X0 ))
        x1 = int(max(coords[1]-30,0))
        x2 = int(min(coords[1]+30,Y0))
        obj_class = center[1]
        detected_objects.append([x1,y1,x2,y2,obj_class])

        img = cv2.rectangle(img, (x1,y1), (x2,y2), (255, 0, 0), 2)

    return img, detected_objects

def yolo_inference(img):
    
    (X0,Y0) = img.shape[:2]
    detected_objects = []

    pred = model.predict(img,iou=0.4) #,iou=0.4
    n_boxes = len(pred[0].boxes)
    [X,Y] = [int(x) for x in pred[0].boxes.orig_shape]

    for i in range(n_boxes):
        box = pred[0].boxes[i]
        conf = float(box.conf)
        if conf<0.6: continue
        [x1,y1,x2,y2] = [int(x) for x in box.xyxy[0]]
        det_class = int(box.cls)
        
        x1,x2,y1,y2 = int(x1/X*X0),int(x2/X*X0),int(y1/Y*Y0),int(y2/Y*Y0)

        img = cv2.rectangle(img, (x1,y1), (x2,y2), (255, 0, 0), 2)

        detected_objects.append([x1,y1,x2,y2,model.names[int(det_class)], conf])

    return img, detected_objects

def add_text(img,detected_objects):
    for det in detected_objects:
        [x1,y1,x2,y2,cl] = det[0:5]
        
        print(cl)
        position = (x1,y1)
        cv2.putText(
            img, #numpy array on which text is written
            cl, #text
            position, #position at which writing has to start
            cv2.FONT_HERSHEY_SIMPLEX, #font family
            1, #font size
            (209, 80, 0, 255), #font color
            1) #font stroke
    return img

def object_detection(img):
    img, detected_objects = yolo_inference(img)
    img = add_text(img,detected_objects)
    return img, detected_objects


