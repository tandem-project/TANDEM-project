#!/bin/bash

TOPIC='Tandem/parking'

smart_city='/var/nfs/general/video/frames/'
smart_jpg='smart-city-001.jpg'

WEB_DIR="/var/www/html/"

BIND_IP="10.124.35.24"
PORT=1883
WEB_PORT=80

MASKED_DIR='/var/nfs/general/video/frames/masked/'

#ANDROID_MESSAGE="file:${WEB_DIR}${smart_jpg}"
ANDROID_MESSAGE="https://${BIND_IP}/"

#TAG="mqtt-broker:0.1.2"
#NAME="mqtt-broker"

#docker stop ${NAME}
#docker rm ${NAME}
#docker rmi ${TAG}

#DOCKER_PARAMS="-it --rm --name $NAME $TAG"

#docker build -t ${TAG} -f Dockerfile.broker .
#docker run $DOCKER_PARAMS

# docker run -d -p 18002:8082 --name ${NAME_SCHEDULER} ${TAG} luigid
# docker exec ${NAME_SCHEDULER} hostname -I

echo "Mosquitto should be running in --> $BIND_IP:$PORT"

ntstat=`netstat -na | grep "$BIND_IP:$PORT" | grep LISTEN | awk {'print $4'} | sed -e 's/.*:/:/g'`
port=":1883"

echo $ntstat
echo $ip_port

if [[ "$ntstat" == "$port" ]]
then
    echo "MQTT Service at port number $port .. is Listening !"
else
    echo "Port is Not Listening"
    return 1
fi

# Capture is-running of SYSTEMCTL STATUS
status=`systemctl is-active apache2`

if [ "$status" == "active" ]; then
    echo "Apache Service is Running"
else
    echo "Apache Service is Not Running - Aborting !"
    return 2
fi

# Check if WEB folder exists
if [ -d "$WEB_DIR" ]; then
    echo "$WEB_DIR exists ... Ready to copy latest parking photo"
fi

# Check if SMART-CITY masked-image exists
if [ -f "$WEB_DIR$smart_jpg" ]; then
    echo "Smart-City Masked Parking Image Exists .... $WEB_DIR$smart_jpg"
fi

# Copy AI_Masked_Image from yolo-folder
#changed_str=`stat -c %y "${smart_city}${smart_jpg}"`
changed_str=`date -r "${smart_city}${smart_jpg}"`

CURRENT="$changed_str"
echo "Smart-City Masked Parking Image ... Modification Date=$CURRENT"

#if [ -z "$previous" ]; then
#    previous="${changed}"
#fi

#2023-11-09 12:05:22.785527739 +0200
# !!! Compare Lexicographically !!!
# if [[ "$changed" > "$previous" ]]; then
#     echo "!!! Found New Parking Image !!!"
# elif [[ "$changed" == "$previous" ]]; then
#     echo "Same Parking Image"
#     return 3
# else
#     echo "Strange : New Image Before Previous !"
#     return 4
# fi

# echo "Ready to handle Parking Image : " "$changed" " ... " "$previous"

# cp_smartCity=`cp "${smart_city}${smart_jpg}" "${WEB_DIR}"`
# previous="${changed}"
# echo "$cp_smartCity"

# if [ -d "$MASKED_DIR" ]; then
#     echo "!!! Inside the MASKED folder !!!"
# else
#     echo "Failed to Enter the Masked Folder"
#     return 5
# fi

# Return tha latest modified file in directory
#cmd_latest_file=`ls -Art "${MASKED_DIR}" | tail -n 1`
#cmd_latest_file=`find "$MASKED_DIR" -maxdepth 1 -newermt "$CURRENT" -exec ls -Art {} \; | tail -n 1`
#cmd_latest_file=`find "$MASKED_DIR" -maxdepth 1 -mmin 1`
cmd_latest_file=`ls "${MASKED_DIR}" | tail -n 1`

latest_masked="${MASKED_DIR}""$cmd_latest_file"
echo "Latest Masked File ... $latest_masked"
echo "$(date -r $latest_masked)"

# Get all files inside folder
#for entry in "${MASKED_DIR}"/*; do
#    echo $(entry)
#done

#FULL_MASKED="$MASKED_DIR/$latest_masked"
FULL_MASKED="$latest_masked"

#echo ">>>> $FULL_MASKED"

if [ -f "$FULL_MASKED" ]; then
    echo "Full Masked Name ... $FULL_MASKED"
else
    echo "Cannot Access Full Masked File ... $FULL_MASKED"
    return 6
fi

#latest_masked_str=`stat -c %y "$FULL_MASKED"`
#latest_masked="$latest_masked_str"

#echo ">>> Latest Masked Modification Time ... $latest_masked"

#cp masked/masked_file.jpg /web_dir/smart-image-001.jpg
# Move latest image into web-folder 
#mv -f "${FULL_MASKED}" /var/www/html/smart-city-001.jpg
smart_city_previous=$(find /var/www/html/ -name masked_frame_*)
#res=$(ls /var/www/html/masked_frame_*)
#echo $res

masked_base=$(basename "$FULL_MASKED")
smart_base=$(basename "$smart_city_previous")

if [[ "$smart_base" > "$masked_base" ]]; then
    echo "Web Folder Image is Newer !  $smart_base > $masked_base"

    $(rm -f "$FULL_MASKED")

    return 7
else
    $(rm -f "$smart_city_previous")
fi
 
mv -f "${FULL_MASKED}" "${WEB_DIR}"
#cp -f "${FULL_MASKED}" /var/www/html/smart-city-001.jpg
#cp -f "${FULL_MASKED}" "${WEB_DIR}"

echo "Moved LATEST MASKED IMAGE into WEB folder ... ${mv_status}"

# Publish New-Parking-Image Message to Topic Tandem
TARGET_FILE="${WEB_DIR}${masked_base}"
echo "New Parking Image ... ${TARGET_FILE}"
mosquitto_pub -h "10.124.35.24" -p 1883 -t "Tandem/parking" -m "https://10.124.35.24/${masked_base}" 

#echo "$latest_masked"

