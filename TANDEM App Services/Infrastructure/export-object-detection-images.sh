#!/bin/bash

OUTPUT_FOLDER=/var/nfs/general/images/

#source tandem/create-ns-tandem.sh

# Create Private Docker Registry ... K8S-PoD
#kubectl create -f tandem/deployments/registry-pod.yaml -n tandem

# @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
# @@@@@@@@@@@ 
# Push Camera4Me .. Contains All Tandem Code
TAG="camera4mev0.0.2"

#DOCKERFILE="tandem/deployments/image-processing-Dockerfile"
DOCKERFILE="/home/vibm/kubernetes/kubernetes-setup/Tandem/parking-space-service/image-processing-Dockerfile"

TARGET_IMAGE="127.0.0.1:30007/camera4me:0.0.2"

docker build --tag $TAG -f $DOCKERFILE .

#docker tag $TAG $TARGET_IMAGE 

# Export image as tar
#docker save -o /home/vagrant/tandem/images/$TAG.tar $TAG
docker save -o $OUTPUT_FOLDER$TAG.tar $TAG

#docker push $TARGET_IMAGE

# *** Manage Containerd Containers and Images ***
# *** Linux Command --> CTR
# ***********************************************

# !!! Push an Image ro a Remote Registry !!!
# Attempt to Pull Image
#ctr images pull 
# Attempt to Push Image 
#ctr push
#crictl pull
#docker rmi $TAG

#docker image ls

TAG="system-monitoring:0.0.2"
DOCKERFILE="/home/vibm/kubernetes/kubernetes-setup/Tandem/parking-space-service/system-monitoring-Dockerfile"
docker build --tag $TAG -f $DOCKERFILE .
docker save -o $OUTPUT_FOLDER$TAG.tar $TAG
