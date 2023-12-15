#!/bin/bash

TAG="rabbitmq-receive:0.0.2"
NAME="rabbitmqReceive"

docker stop ${NAME}
docker rm ${NAME}
docker rmi ${TAG}

DOCKER_PARAMS="-it --rm --name $NAME $TAG"

docker build -t ${TAG} -f Dockerfile.receive .
docker run $DOCKER_PARAMS

# docker run -d -p 18002:8082 --name ${NAME_SCHEDULER} ${TAG} luigid
# docker exec ${NAME_SCHEDULER} hostname -I
