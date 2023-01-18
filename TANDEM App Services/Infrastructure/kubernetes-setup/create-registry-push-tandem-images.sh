#!/bin/bash

#source tandem/create-ns-tandem.sh

# Create Private Docker Registry ... K8S-PoD
#kubectl create -f tandem/deployments/registry-pod.yaml -n tandem

# Push Camera4Me .. Contains All Tandem Code
#TAG="camera4me:0.0.2"

#DOCKERFILE="tandem/deployments/image-processing-Dockerfile"
#DOCKERFILE="/home/vibm/kubernetes/kubernetes-setup/Tandem/parking-space-service/image-processing-Dockerfile"

#TARGET_IMAGE="127.0.0.1:30007/camera4me:0.0.2"

#docker build --tag $TAG -f $DOCKERFILE .

#docker tag $TAG $TARGET_IMAGE 

# Export image as tar
#docker save -o /home/vagrant/tandem/images/$TAG.tar $TAG
#docker save -o /home/vibm/docker/images/$TAG.tar $TAG

for server = node-I (i=1,2,...)
docker load --input /data/images/camera4me\:0.0.2.tar
docker image ls

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