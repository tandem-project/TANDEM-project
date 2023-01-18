import torch

# Load Model
model = torch.hub.load('ultranalytics/yolov5', 'yolov5s') # or yolov5m, yolov5l, yolov5x, custom

# Define Image
img = 'smart-city-001.jpg'

# Inference
results = model(img)

# Results
results.print() # or .show(), .save(), .crop(), .pandas()
