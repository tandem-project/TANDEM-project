#!/bin/bash

docker build -t nvidia-pytorch21.08-yolov5 -f Dockerfile-nvidiapytorch21.08-yolov5 .

docker run --gpus all -it --rm --ipc=host --ulimit memlock=-1 --ulimit stack=67108864  nvidia-pytorch21.08-yolov5
