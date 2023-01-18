#!/bin/bash

NAME="rabbitmq"
TAG="3.10"

OUTPUT_FOLDER="/var/nfs/general/images/"

#OUTPUT_FULLNAME=$OUTPUT_FOLDER$NAME"v"$TAG.tar
OUTPUT_FULLNAME=$OUTPUT_FOLDER$NAME".tar"

# Need to have the image locally before saving it
docker pull $NAME:$TAG

# What images are present
docker images

docker save $NAME:$TAG --output $OUTPUT_FULLNAME
