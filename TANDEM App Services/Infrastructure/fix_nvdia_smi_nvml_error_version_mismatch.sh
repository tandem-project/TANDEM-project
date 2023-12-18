#!/bin/bash

NVIDIA_DRIVERS_FOLDER='/home/vibm/NVIDIA/drivers'
NVIDIA_DRIVERS_SCRIPT='install-nvidia-tesla-driver.sh'

echo "Run the nvidia-smi (System Management Interface) tool ... "$(nvidia-smi)

ls -la $NVIDIA_DRIVERS_FOLDER/$NVIDIA_DRIVERS_SCRIPT

source $NVIDIA_DRIVERS_FOLDER/$NVIDIA_DRIVERS_SCRIPT