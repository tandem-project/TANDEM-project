#!/bin/bash

BINDMOUNT="-v /var/nfs/general/video/frames:/machine-learning-python/tandem/ui/static/downloads/"

# Download latest Dockerfile from GitHub
RAW_DOCKERFILE="https://raw.githubusercontent.com/mvimplis2013/machine-learning-python/master/docker/Dockerfile-UI"
LOCAL_DOCKERFILE=flaskAppDockerfile
curl -o $LOCAL_DOCKERFILE $RAW_DOCKERFILE 
#******************* Download Dockerfile *************************

OUTPUT_FOLDER=/var/nfs/general/images/

TAG="flask-application:0.0.1"
NAME="tandem-web-ui"
COMMAND="/bin/bash"
#COMMAND="flask-application"

#DOCKERFILE="/home/vibm/kubernetes/kubernetes-setup/Tandem/parking-space-service/messaging-operator-Dockerfile"

docker container stop $NAME
docker container rm $NAME
docker container ls

#docker image rm --force $TAG

# Remove All Stopped 
docker system prune --force
docker image prune --all --force

#docker build --no-cache --tag $TAG -f $DOCKERFILE .
docker build --tag $TAG -f $LOCAL_DOCKERFILE .

docker run --rm -it -p 18008:5000 $BINDMOUNT --name $NAME $TAG $COMMAND
#docker run --rm -p 18008:5000 $TAG

docker save -o $OUTPUT_FOLDER$TAG.tar $TAG

#docker log $TAG 
