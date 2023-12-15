#!/bin/bash

echo -e '\e[33m\e[4mHow Much Space Used by Docker\e[0m'
docker system df

docker ps
docker stop <container-id>

echo -e '\e[1m\e[5m\e[31mClean Up Everything in Docker\e[0m'
docker system prune -a -f
docker image prune -a
docker container prune
docker volume prune

echo -e '\e[92mStop Vagrant Machines\e[0m'
vboxmanage list vms

#vboxmanage unregistervm --delete "demo-vagrant_default_1638888523597_30565"
vboxmanage unregistervm --delete "proj_dummy_01_default_1643901411215_94466"

cd ~/VirtualBox VMs/
cd <subfolder>
vagrant destroy -f

vboxmanage list vms
.. must fewer VMs running


cd /var/nfs/general/images

sudo du -sh frames
sudo rm -rf frames

# How to find out top 10 largest file/ directories
sudo du -a / | sort -n -r | head -n 10



