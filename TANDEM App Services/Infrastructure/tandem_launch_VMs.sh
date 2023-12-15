#!/bin/bash

./export-object-detection-images.sh

vagrant status

vagrant destroy -f

vagrant up k8s-master node-1 

vagrant ssh k8s-master 
