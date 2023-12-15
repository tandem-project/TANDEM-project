from flask import Flask, request, jsonify, render_template, Response
import cv2
import numpy as np 
import time, os
import json
from app.objdet import *
from ultralytics import YOLO

objdet = ObjectDetection()


def create_app():
    app = Flask(__name__)
    app.secret_key = '1821'
    cap = cv2.VideoCapture()
    
    @app.route('/')
    def index():
        return "Hello World"
    
       
    @app.route("/inference",methods=['POST'])
    def make_predictions():
        image_bytes = request.files['file'].read()
        f2 = np.frombuffer(image_bytes, np.uint8)
        cv_image = cv2.imdecode(f2, cv2.IMREAD_COLOR)
        
        img,detected_objects = objdet.object_detection(cv_image)

        detections = detected_objects

        print("Detections:",detections)
        print()

        prediction = {'predictions_list':detections}

        return jsonify(prediction)
    
    return app


if __name__ =='__main__':
    create_app().run(debug=True)