#!/bin/bash

echo 'Clone the Helm chart from https://github.com/halkeye-charts/mosquitto'
git clone https://github.com/halkeye-helm-charts/mosquitto.git

#cd mosquitto && ls
helm install mosquitto --generate-name

#echo 'Helm Install from ArtifactHUB'

#helm repo add t3n https://storage.googleapis.com/t3n-helm-charts

#helm install my-mosquitto t3n/mosquitto --version 2.4.1
