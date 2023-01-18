#!/bin/bash

BINDMOUNT="-v /var/nfs/general/video/frames:/workspace/ai-express/frames/"

docker build -t nvidia-pytorch21.08-detectron2 -f Dockerfile-nvidiapytorch21.08-detectron2-vibm .

# Always add HTTP_PROXY && HTTPS_PROXY --> Otherwise Model Download is Failing
docker run --network host --env HTTP_PROXY="http://icache.intracomtel.com:80" --env HTTPS_PROXY="http://icache.intracomtel.com:80" --gpus all -it --rm --ipc=host --ulimit memlock=-1 --ulimit stack=67108864 $BINDMOUNT nvidia-pytorch21.08-detectron2
