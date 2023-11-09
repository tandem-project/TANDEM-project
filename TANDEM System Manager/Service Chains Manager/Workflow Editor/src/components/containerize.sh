#!/bin/bash -e
image_name=johnkalogero/$1
image_tag=latest
full_image_name=${image_name}:${image_tag}

cd $1
echo "Will build and push an image with name: $full_image_name"

sudo docker build -t "${full_image_name}" .
sudo docker push "$full_image_name"

# Output the strict image name.
sudo docker inspect --format="{{index .RepoDigests 0}}" "${full_image_name}"