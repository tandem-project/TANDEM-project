FRAMES_FOLDER=/var/nfs/general/video/frames

ls -lt $FRAMES_FOLDER

frames_count=$(find $FRAMES_FOLDER -type f -name '*.jpg' | wc -l)

echo "Number of Frames Found = $frames_count" 

