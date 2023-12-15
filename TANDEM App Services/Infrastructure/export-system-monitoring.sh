#!/bin/bash

TAG="system-monitoring:0.0.2"
DOCKERFILE="/home/vibm/kubernetes/kubernetes-setup/Tandem/parking-space-service/system-monitoring-Dockerfile"
docker build --tag $TAG -f $DOCKERFILE .
docker save -o $OUTPUT_FOLDER$TAG.tar $TAG
