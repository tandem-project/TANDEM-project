#!/usr/bin/env python3 

from ultralytics import YOLO
import cv2
import os, time
import tarfile, shutil

name = str(os.getenv('name'))

weights = name +'.pt'
model = YOLO(weights)

class ObjectDetection(object):
    def __init__(self):
        self.model = model
        self.weights = None

    def inference(self,source,*args,**kwargs): 
      
        detected_objects = []
        model = self.model
        pred = model.predict(source,*args,**kwargs)

        n_boxes = len(pred[0].boxes)
        (X0,Y0) = pred[0].orig_img.shape[:2]
        [X,Y] = [int(x) for x in pred[0].boxes.orig_shape]

        for i in range(n_boxes):
            box = pred[0].boxes[i]
            conf = float(box.conf)
            [x1,y1,x2,y2] = [int(x) for x in box.xyxy[0]]
            det_class = int(box.cls)
            x1,x2,y1,y2 = int(x1/X*X0),int(x2/X*X0),int(y1/Y*Y0),int(y2/Y*Y0)
            #img = cv2.rectangle(img, (x1,y1), (x2,y2), (255, 0, 0), 2)
            detected_objects.append([x1,y1,x2,y2,model.names[int(det_class)]])

        img = source
        return img, detected_objects

    def add_text(self,img,detected_objects):
        for det in detected_objects:
            [x1,y1,x2,y2,cl] = det
            position = (x1,y1-3)
            img = cv2.rectangle(img, (x1,y1), (x2,y2), (255, 0, 0), 2)
            cv2.putText(
                img, #numpy array on which text is written
                cl, #text
                position, #position at which writing has to start
                cv2.FONT_HERSHEY_SIMPLEX, #font family
                1, #font size
                (209, 80, 0, 255), #font color
                1) #font stroke
        return img

    def object_detection(self,img):
        img, detected_objects = self.inference(img)
        # img = self.add_text(img,detected_objects)
        return img, detected_objects

    def inference_from_file(self,path):
        cv_image = cv2.imread(path)
        img, detected_objects = self.inference(cv_image)
        img = self.add_text(img,detected_objects)
        cv2.imshow('inference',img)
        cv2.waitKey(0)




