#!/bin/bash

# Pull NGINX image from Docker Hub
docker pull nginx:1.20.2

# Tag the image with its target path in container registry
#docker tag nginx:1.20.2 k8s-master:31320/nginx:1.20.2
docker tag nginx:1.20.2 127.0.0.1:31320/nginx:1.20.2

# Push image to local registry
docker push 127.0.0.1:31320/nginx:1.20.2

docker image ls
