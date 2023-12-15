import os
import time, datetime
import shutil

import cv2

import detectron2
from detectron2.utils.logger import setup_logger
setup_logger()

from detectron2 import model_zoo
from detectron2.config import get_cfg
from detectron2.engine import DefaultPredictor
from detectron2.utils.visualizer import Visualizer, ColorMode
from detectron2.data import MetadataCatalog, DatasetCatalog

import matplotlib.pyplot as plt
import numpy as np
import collections

PARKING_CAPACITY = 60

predictor = ""
cfg = ""

def create_classification_model():
    global predictor
    global cfg
    
    start_t = time.time()

    # Create a Detectron2 Config
    cfg = get_cfg()

    # Add project specific configuration (e.g. TensorMask) - if you are not running a model in core library
    cfg.merge_from_file(
        model_zoo.get_config_file(
            "Misc/cascade_mask_rcnn_X_152_32x8d_FPN_IN5k_gn_dconv.yaml"
        )
    )

    # *********************************
    #   ML Configuration Paraemeters
    # *********************************
    cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.2
    cfg.MODEL.ROI_HEADS.IOU_THRESHOLDS = [0.5]
    cfg.MODEL.ROI_HEADS.NMS_THRESH_TEST = 0.5

    # ALWAYS USE A GPU when is available 
    #cfg.MODEL.DEVICE = "cpu"

    #cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("COCO-InstanceSegmentation/mask_rcnn_R_50_FPN_3x.yaml")
    #cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("COCO-InstanceSegmentation/mask_rcnn_R_101_C4_3x.yaml")
    #cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("COCO-InstanceSegmentation/mask_rcnn_R_101_DC5_3x.yaml")
    #cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("COCO-InstanceSegmentation/mask_rcnn_R_101_FPN_3x.yaml") # 10s completed / 44 Found
    #cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("COCO-InstanceSegmentation/mask_rcnn_X_101_32x8d_FPN_3x.yaml") # 16s completed / 31 Found

    # MISC
    #cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("Misc/mask_rcnn_R_50_FPN_1x_dconv_c3-c5.yaml") # 7s completed/ 2s Inference/ 34 Found
    #cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("Misc/mask_rcnn_R_50_FPN_3x_dconv_c3-c5.yaml") # 8s completed/ 2s Inference/ 34 Found

    cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("Misc/cascade_mask_rcnn_X_152_32x8d_FPN_IN5k_gn_dconv.yaml") # !!!! Needed 28s !!! 3s Inference + 32 Found

    # CITYSCAPES
    #cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("Cityscapes/mask_rcnn_R_50_FPN.yaml") # 8s / 1s/ 5Found BAD BAD BAD BAD

    #cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("COCO-InstanceSegmentation/mask_rcnn_R_50_FPN_3x.yaml")
   
    #cfg.MODEL.NMS_THRESH_TEST = 0.80

    # *****************************
    # The Trained Predictor at COCO
    # ********************************
    # Create Image Classification Model
    # ---------------------------------
    predictor = DefaultPredictor(cfg)
    # ********************************

    end_t = time.time()
    elapsed_time = end_t - start_t
    print('Finished with Mask-RCNN Model Preparation -- Ready for Predictions !' + "\n *** Elapsed Time = " + str(elapsed_time) + " (msecs) ***")
    
#############################################################################################################
### CoreML Tools: Load ML Configuration Parameters , Load Predictor and Apply the Object-Detection Model r###
#############################################################################################################
def ai_core():
    global predictor
    global cfg

    # Always Read frames/smart-city-001.jpg
    frame_fname = "smart-city-001.jpg"
    img = cv2.imread(frame_fname)

    #if img == None:
    #    print(f"Found Null Image")
    #    raise Exception("NULL Image")

    # **************************************************
    # Apply Mask-RCNN Model ... Find All Objects += Cars
    # **************************************************
    outputs = predictor(img)
    
    #print( "Predictions All = " + str(outputs) );
    
    #print( "Default Prediction Image Size ... " + str(outputs["instances"].image_size[0]) + " , " + str(outputs["instances"].image_size[1])  )
    
    all_instances = outputs["instances"]
    
    scores = outputs["instances"].scores

    predBoxes = outputs["instances"].pred_boxes
    
    predClasses = outputs["instances"].pred_classes
    predClassesLst = predClasses.tolist()

    class_names = MetadataCatalog.get(cfg.DATASETS.TRAIN[0]).thing_classes
    pred_class_names = list( map( lambda x: class_names[x], predClassesLst ) )
   
    # Torch Tensor 
    predMasks = outputs["instances"].pred_masks
    predAreas = predBoxes.area() 
    predCenters = predBoxes.get_centers()

    #print( "Prediction Scores = " + str(scores) )
    #print( "Prediction Boxes  = " + str(predBoxes) )
    #print( "Prediction Classes = " + str(predClasses) )
    #print( "Prediction Masks = " + str(predMasks) )
    #print( "P rediction Box Areas = " + str(predAreas) )
    #print( "Class Names = " + str(pred_class_names) )
    
    #for out in outputs:
        #print( "Default Predictor Scores = .... " + str(scores) )
        #print( "Prediction Finished 4 [Label, BoBox, Mask] ... " + str(predBoxes.area()) )

        #for o in outputs[out]:
        #    print( "Rediction Item ... " + o ) 

    # Information #01 --> Bounding Boxes of Recognized objects
    # --------------------------------------------------------
    #outputs_pred_boxes = outputs["instances"].pred_boxes
    #pred_boxes_centers = outputs_pred_boxes.get_centers()

    num_boxes = len(predBoxes)
    print( "Number of INTERESTING objects found in '%s' = %d" % (frame_fname , num_boxes))

    #print(f"Predictions Insight .... {outputs}")

    v = Visualizer(img[:,:,::-1], MetadataCatalog.get(cfg.DATASETS.TRAIN[0]), scale=1.2, instance_mode=ColorMode.SEGMENTATION)

    out = v.draw_instance_predictions(outputs["instances"].to("cpu"))

    #unique, counts = numpy.unique(class_names, return_counts=True)
    counter_car = 0
    counter_people = 0
    counter_truck = 0

    #instances_intracom = detectron2.structures.Instances()
    for i in range(len(predClasses)):
        #ii = i.cpu().numpy()
        
        name = pred_class_names[i]
        bb_center = predCenters.tolist()[i]

        center_col = bb_center[0]
        center_row = bb_center[1]

        #print(f">>> Bounding Box Center Row ... {center_row}")
        if float(center_row) < float(240):
            # SOS : INTRACOM HARD-CODED TOPOLOGICAL CONSTRAINT
            #print(f"{name} In Another Parking ... {center_row}")
            continue
        
        #print(f"Found {name} in this Parking")
        
        if name == "car":
            counter_car += 1
        elif name == "person":
            print(f"Found a Person @ {center_col} , {center_row}")
            counter_people += 1
        elif name == "truck":
            counter_truck += 1

    current_parking_date = datetime.datetime.now() + datetime.timedelta(hours=2)
    
    #v.draw_text(f'{current_parking_date.strftime("%Y-%m-%d %H:%M:%S")}', [198, 40], color='r', font_size=26)
    
    #v.draw_text(f"Number of Cars in Parking Lot =  {counter_car:03}", [889, 40], font_size=30)
    #v.draw_text(f"Number of Free Parking Spaces = {PARKING_CAPACITY-counter_car:03}", [889, 80], font_size=30)
    #v.draw_text(f"People walking inside Parking =  {counter_people:03}", [889, 120], font_size=30)
    ##v.draw_text(f"Number of Trucks in Parking = {counter_truck}", [860, 160], font_size=30)

    x_data = [50, 50, 1250, 1250]
    y_data = [0, 240, 240, 0]
    #v.draw_line(x_data, y_data, color='m', linestyle="--", linewidth=1.7)
    #v.draw_polygon(
    #    [[x_data[0], y_data[0]], [x_data[1], y_data[1]], [x_data[2], y_data[2]], [x_data[3], y_data[3]]],
    #    color='r', alpha=1)

    v.draw_circle([50, 200], color='b', radius=3)
    v.draw_circle([550, 200], color='b', radius=3)

    #print( f"Prediction Boxes Centers = {predCenters[0].tolist()}" )
   
    # Save Masked Image ... frames/masked_frame.jpg
    destname = "/workspace/ai-express/frames/masked_frame.jpg"

    image = out.get_image()[:, :, ::-1]
    image = np.array(image)

    #image = cv2.rectangle(image, (5, 5), (1545, 46), (0, 0, 0), -1)
    #image = cv2.rectangle(image, (465, 46), (605, 86), (0, 0, 0), -1)
    #image = cv2.rectangle(image, (5, 86), (601, 155), (0, 0, 0), -1)

    #chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://www.itftennis.com/media/2143/health-cardiovascular-health-issues.pdfimage = cv2.rectangle(image, (5, 144), (605, 260), (0, 0, 0), -1)

    #image = cv2.rectangle(image, (605, 190), (1545, 260), (0, 0, 0), -1)
    #cv2.putText(
    #    img=image, text="INTRACOM TELECOM A5", org=(10, 240), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1.5, color=(255, 255, 255), thickness=2
    #)
    
    ret_imwr = cv2.imwrite(destname, image)
    
    #ret_imwr = cv2.imwrite(destname, out.get_image()[:, :, ::-1])
    #plt.imsave(destname, out.get_image()[:, :, ::-1], cmap=plt.cm.gray)

    #print( f"IMWrite Return Code  = {ret_imwr}" )
    
    return destname

#####################################################################################
#####  Perform Object-Detection with Pretrained-Model ... Apply to Input Image  #####
#####################################################################################
def deep_core( framename ):
    print(f"Ready for Object Detection in Image --> {framename}")

    # Change Working Directory .... Move to FRAMES
    os.chdir("../frames/")
    #print(f"Current Working Directory is ... {os.getcwd()}")

    if not os.path.isfile(framename):
        # Need aN IMAGE for prediction
        print("Cannot Read this Frame - Aborting !!!")
        return

    # Load Input Image 
    src = framename

    # Copy Original Frame from Time-Period Folder to Parent-Folder ... Always has name "smart-city-001.jpg"
    dest = os.getcwd() + "/" + "smart-city-001.jpg"
    shutil.copyfile(src, dest)

    #print(f"Frame is Available for Recognition ... {dest}")

    try:
        masked_file = ai_core()
    except Exception as e:
        print(f"Probleeeeeeeem: {e}")
        return       

    maskedfolder = os.getcwd() + "/masked/" 
    if not os.path.isdir( maskedfolder ):
        os.makedirs( maskedfolder )
        
    name = framename.split("/")[-1]
    shutil.move( masked_file, maskedfolder + "masked_" + name)

    return True
