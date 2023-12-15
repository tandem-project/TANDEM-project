#!/bin/bash

OUTPUT_FOLDER=/var/nfs/general/images/
TAG="camera4mev0.0.2"
DOCKERFILE="/home/vibm/kubernetes/kubernetes-setup/Tandem/parking-space-service/image-processing-Dockerfile"

docker container ls

# Remove All Stopped 
#docker system prune --force

docker build --no-cache --tag $TAG -f $DOCKERFILE .

docker save -o $OUTPUT_FOLDER$TAG.tar $TAG

docker image ls 
