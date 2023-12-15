#!/bin/bash

#cd /home/vibm/docker/registry/
#./run-local-registry.sh 

cd ~/vagrant/projects/docker-private-registry/
vagrant destroy -f
vagrant up
