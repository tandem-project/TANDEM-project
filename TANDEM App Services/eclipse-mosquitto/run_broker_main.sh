#!/bin/bash

echo "Ready to Start Collecting Smart-City Parking Images every 10secs"


for i in `seq 1000000`; do
    source ./run_broker.sh
   
    sleep 1s
done
