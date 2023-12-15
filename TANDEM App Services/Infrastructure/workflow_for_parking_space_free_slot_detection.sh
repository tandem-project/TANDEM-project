#!/bin/bash

echo "********************************************************************************************"
echo "*** How to Run Single Image Inference Tool - Find Open Slots in Section-A5 Parking Space ***"
echo "********************************************************************************************"

echo "[STEP #01] Need to Chack that NVIDIA-SMI Tool is Working"
echo "--> run the NVIDIA-SMI console command"

echo "[STEP #02] In Case of NVIDIA-SMI Error, Re-Install the NVIDIA-GPU Drivers ...  NVIDIA-Linux-x86_64-510.54.run"
cat /home/vibm/NVIDIA/drivers/install-nvidia-tesla-driver.sh

echo "[STEP #03] Install NVIDIA-GPU Drivers for Docker Containers"
cat /home/vibm/NVIDIA/docker/install_nvidia_container_toolkit.sh

echo "********************************************************************************"
echo "Server is Ready to Run AI Inference Tasks with Code running on Docker Containers"
echo "********************************************************************************"

echo "[STEP #04] Detect Open Slots in Parking Spaces using Detectron2 Filter"
cat /home/vibm/NVIDIA/examples/nvidia-gpu/nvidia-pytorch_21.08-detectron2-container.sh

echo "In case of Yolo Run the NVIDIA-PYTORCH_21.08-YOLOV5-CONTAINER.sh"

echo "[STEP #05] Login to GPU-Enabled Container && Run Inference Code for All A5-ParkingSpace Frames"
echo "Inside Container ... CD AI-EXPRESS/SRC"
echo "Run Main Module to Start Scanning Every Frame ... PYTHON FRAMES_COLLECTOR.PY"

