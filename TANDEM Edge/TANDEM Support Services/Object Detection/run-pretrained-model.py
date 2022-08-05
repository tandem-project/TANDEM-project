import time

import detectron2
from detectron2.utils.logger import setup_logger
setup_logger()

from detectron2 import model_zoo
from detectron2.config import get_cfg
from detectron2.engine import DefaultPredictor
from detectron2.utils.visualizer import Visualizer
from detectron2.data import MetadataCatalog, DatasetCatalog

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
