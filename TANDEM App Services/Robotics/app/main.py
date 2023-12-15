from flask import Flask, request, jsonify
import cv2
import numpy as np 
import time 
from app.objdet import *

t1 = time.monotonic()

def create_app():
    app = Flask(__name__)

    @app.route('/')
    def index():
        return "Hello World!"

    @app.route("/inference",methods=['POST'])
    def inference():
        # f1 = request.form.get('image')
        # f1 = request.data
        image_bytes = request.files['file'].read()
        f2 = np.frombuffer(image_bytes, np.uint8)
        cv_image = cv2.imdecode(f2, cv2.IMREAD_COLOR)

        img,detected_objects = object_detection(cv_image)
        
        detections = detected_objects

        print(" --  ")
        print(detections)
        print(" --  ")

        prediction = {'predictions_list':detections}

        return jsonify(prediction)
    
    return app

# if __name__ == '__main__':
#     app = create_app()
#     app.run(debug=True,host='0.0.0.0',port=1821)
