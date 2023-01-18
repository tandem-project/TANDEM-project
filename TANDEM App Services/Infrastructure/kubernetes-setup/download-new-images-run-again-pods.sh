# Remove Old Images from Private Repository  
TARGET_IMAGE="127.0.0.1:30007/camera4me:0.0.2"
docker image rm $TARGET_IMAGE

# Download new code from GitHub && Re-Build Docker Images
TAG="camera4me:0.0.2"
docker image rm $TAG

DOCKERFILE="tandem/deployments/image-processing-Dockerfile"
docker build --tag $TAG -f $DOCKERFILE .

# Tag & Push to Private Registry
docker tag $TAG $TARGET_IMAGE
docker push $TARGET_IMAGE

