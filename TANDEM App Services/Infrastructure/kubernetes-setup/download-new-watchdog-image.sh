# Remove Old Images from Private Repository  
TARGET_IMAGE="127.0.0.1:30007/camera4me:0.0.2"
docker image rm $TARGET_IMAGE

# Remove Local Image
TAG="camera4me:0.0.2"
docker image rm $TAG

# Remove image from  Node-1 & Node-2 ...  127.0.0.1:30007/camera4me:0.0.2
sshpass -p "vagrant" ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null vagrant@192.168.50.11 'docker image rm 127.0.0.1:30007/camera4me:0.0.2; docker image ls'
sshpass -p "vagrant" ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null vagrant@192.168.50.12 'docker image rm 127.0.0.1:30007/camera4me:0.0.2; docker image ls'

# Download new code from GitHub && Re-Build Docker Images
DOCKERFILE="tandem/deployments/image-processing-Dockerfile"
docker build --tag $TAG -f $DOCKERFILE .

# Tag & Push to Private Registry
docker tag $TAG $TARGET_IMAGE
docker push $TARGET_IMAGE

