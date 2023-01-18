import os
import time
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

#############################################################################################################
### CoreML Tools: Load ML Configuration Parameters , Load Predictor and Apply the Object-Detection Model r###
#############################################################################################################
def ai_core():
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
    cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.50

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

    # Always Read frames/smart-city-001.jpg
    frame_fname = "smart-city-001.jpg"
    img = cv2.imread(frame_fname)

    # **************************************************
    # Apply Mask-RCNN Model ... Find All Objects += Cars
    # **************************************************
    outputs = predictor(img)

    # Information #01 --> Bounding Boxes of Recognized objects
    # --------------------------------------------------------
    outputs_pred_boxes = outputs["instances"].pred_boxes
    pred_boxes_centers = outputs_pred_boxes.get_centers()

    num_boxes = len(outputs_pred_boxes)
    print( "Number of INTERESTING objects found in '%s' = %d" % (frame_fname , num_boxes))

    #print(f"Predictions Insight .... {outputs}")

    v = Visualizer(img[:,:,::-1], MetadataCatalog.get(cfg.DATASETS.TRAIN[0]), scale=1.2, instance_mode=ColorMode.SEGMENTATION)

    out = v.draw_instance_predictions(outputs["instances"].to("cpu"))

    # Save Masked Image ... frames/masked_frame.jpg
    destname = "masked_frame.jpg"
    cv2.imwrite(destname, out.get_image()[:, :, ::-1])
    
    return destname

#####################################################################################
#####  Perform Object-Detection with Pretrained-Model ... Apply to Input Image  #####
#####################################################################################
def deep_core( framename ):
    print(f"Ready for Object Detection in Image --> {framename}")

    # Change Working Directory .... Move to FRAMES
    os.chdir("../frames/")
    print(f"Current Working Directory is ... {os.getcwd()}")

    if not os.path.isfile(framename):
        # Need aN IMAGE for prediction
        print("Cannot Read this Frame - Aborting !!!")
        return

    # Load Input Image 
    src = framename

    # Copy Original Frame from Time-Period Folder to Parent-Folder ... Always has name "smart-city-001.jpg"
    dest = os.getcwd() + "/" + "smart-city-001.jpg"
    shutil.copyfile(src, dest)

    print(f"Frame is Available for Recognition ... {dest}")

    masked_file = ai_core()

    maskedfolder = os.getcwd() + "/masked/" 
    if not os.path.isdir( maskedfolder ):
        os.makedirs( maskedfolder )
        
    name = framename.split("/")[-1]
    shutil.move( masked_file, maskedfolder + "masked_" + name)

    return True
