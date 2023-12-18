#!/bin/bash

BINDMOUNT="-v /var/nfs/general/video:/data/video/"

# Download latest Dockerfile from GitHub
RAW_DOCKERFILE="https://raw.githubusercontent.com/mvimplis2013/machine-learning-python/master/docker/Dockerfile-video"
LOCAL_DOCKERFILE=videoDockerfile

#rm $LOCAL_DOCKERFILE
#wget --no-cache -O $LOCAL_DOCKERFILE $RAW_DOCKERFILE 
#******************* Download Dockerfile *************************

OUTPUT_FOLDER=/var/nfs/general/images/

TAG="video-converter:0.0.1"
NAME="video-converter"

#COMMAND="/bin/bash"
#COMMAND="flask-application"
COMMAND="video-creator --frames_folder  /data/frames/2023-03-07-13_56_18"

#DOCKERFILE="/home/vibm/kubernetes/kubernetes-setup/Tandem/parking-space-service/messaging-operator-Dockerfile"

#docker rm $TAG
#docker container ls

#docker image rm --force $TAG

# Remove All Stopped 
#docker system prune --force
#docker image prune --all --force

#docker build --no-cache --tag $TAG -f $DOCKERFILE .
#docker build --no-cache --force-rm --tag $TAG -f $LOCAL_DOCKERFILE .
docker build --no-cache --tag $TAG -f $LOCAL_DOCKERFILE .

docker run --rm -it --name $NAME $BINDMOUNT $TAG
docker run --rm -it --name $NAME $BINDMOUNT $TAG $COMMAND

#exec $TAG

#docker run --rm -p 18008:5000 $TAG

docker save -o $OUTPUT_FOLDER$TAG.tar $TAG

#docker log $TAG 