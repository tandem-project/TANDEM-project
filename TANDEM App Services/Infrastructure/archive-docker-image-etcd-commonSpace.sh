#!/bin/bash

NAME="bitnami/etcd"
ONLY_NAME="etcd"

TAG="3.5"

OUTPUT_FOLDER="/var/nfs/general/images/"

OUTPUT_FULLNAME=$OUTPUT_FOLDER$ONLY_NAME".tar"

docker pull $NAME:$TAG

docker images

docker save $NAME:$TAG --output $OUTPUT_FULLNAME
