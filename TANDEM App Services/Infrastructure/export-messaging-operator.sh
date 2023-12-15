#!/bin/bash

# Download latest Dockerfile from GitHub
RAW_DOCKERFILE="https://raw.githubusercontent.com/mvimplis2013/machine-learning-python/master/docker/messaging/Dockerfile"
LOCAL_DOCKERFILE=messaging_operator-rawDockerfile
curl -o $LOCAL_DOCKERFILE $RAW_DOCKERFILE 
#******************* Download Dockerfile *************************

OUTPUT_FOLDER=/var/nfs/general/images/

TAG="messaging-operator"

DOCKERFILE="/home/vibm/kubernetes/kubernetes-setup/Tandem/parking-space-service/messaging-operator-Dockerfile"

docker rm $TAG
docker container ls

# Remove All Stopped 
#docker system prune --force

#docker build --no-cache --tag $TAG -f $DOCKERFILE .
docker build --no-cache --tag $TAG -f $LOCAL_DOCKERFILE .

docker save -o $OUTPUT_FOLDER$TAG.tar $TAG

docker image ls 
