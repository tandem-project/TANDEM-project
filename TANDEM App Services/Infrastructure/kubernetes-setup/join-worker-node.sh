#!/bin/sh

DOCKER_IMAGES_FOLDER=/data/images/

user_id=$(id -u)

if [ "$user_id" -ne 0 ]
then
    echo "Script Must Run as ROOT !!!"
    exit 0
fi

export HTTP_PROXY=http://icache.intracomtel.com:80
export HTTPS_PROXY=http://icache.intracomtel.com:80
export NO_PROXY=192.168.0.0/16,10.96.0.0/16

MASTER_NODE=vagrant@192.168.56.10

#sshpass "vagrant" scp vagrant@192.168.50.10:/home/vagrant/bootstrap-token-for-worker ./
sshpass -p "vagrant" scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null $MASTER_NODE:/home/vagrant/bootstrap-token-for-worker.sh ./

chmod u+x ./bootstrap-token-for-worker.sh

systemctl status containerd.service --no-pager
systemctl status docker.service --no-pager

# Only docker.service
systemctl disable dockerd.service
# *******************************
ctr version
runc list

mkdir -p /opt/cni/bin/
curl -fsSLo /opt/cni/bin/cni-plugins-linux-amd64-v1.1.1.tgz https://github.com/containernetworking/plugins/releases/download/v1.1.1/cni-plugins-linux-amd64-v1.1.1.tgz
tar -xzvf /opt/cni/bin/cni-plugins-linux-amd64-v1.1.1.tgz

curl -fsSLo go1.18.3.linux-amd64.tar.gz https://go.dev/dl/go1.18.3.linux-amd64.tar.gz
#sudo curl -fsSLo go1.13.linux-amd64.tar.gz https://go.dev/dl/go1.13.linux-amd64.tar.gz
rm -rf /usr/local/go/

tar -C /usr/local -xzf go1.18.3.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin

go version

# Env GOPATH
mkdir -p /home/vagrant/go/bin
mkdir -p /home/vagrant/go/pkg
mkdir -p /home/vagrant/go/src
chmod -R a=rwx /home/vagrant/go/

export GOPATH='/home/vagrant/go/'

# CRI Interface for Docker-Engine
git clone https://github.com/Mirantis/cri-dockerd.git
cd cri-dockerd && mkdir bin

go tidy
chmod a=wrx -R /home/vagrant/cri-dockerd/

go build -o bin/cri-dockerd

install -o root -g root -m 0755 bin/cri-dockerd /usr/local/bin/cri-dockerd

cp -a packaging/systemd/* /etc/systemd/system

sed -i -e 's,/usr/bin/cri-dockerd,/usr/local/bin/cri-dockerd,' /etc/systemd/system/cri-docker.service

systemctl daemon-reload
systemctl enable cri-docker.service
systemctl enable --now cri-docker.socket

# CRI-Listens  @
systemctl status cri-docker.service
systemctl status cri-docker.socket

cat <<EOF | sudo tee /etc/crictl.yaml
runtime-endpoint: unix:///run/cri-dockerd.sock
image-endpoint: unix:///run/cri-dockerd.sock
EOF

crictl pull busybox
crictl image

# @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
# Docker Load Images from TAR file
# @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
for entry in "$DOCKER_IMAGES_FOLDER"/*.tar
do
    #echo $entry
    docker load -i "$entry"
done

# $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
#   Install Binaries of NERDCTL
# $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
echo "!!! Interact with ContainerD via NEDCTL ... https://github.com/containerd/nerdctl !!!"
wget https://github.com/containerd/nerdctl/releases/tag/v0.21.0/nerdctl-0.21.0-linux-amd64.tar.gz
tar Cxzvvf /usr/local/bin/ nerdctl-0.21.0-linux-amd64.tar.gz

systemctl enable --now containerd
nerdctl --help

#docker load -i /data/images/camera4mev0.0.2.tar
echo "List All Images Using Docker Command in Worker-Node"
docker image ls
echo "List All Images Using CRICTL "
crictl --address /run/cri-dockerd.sock images list

# Build Docker Image for Messaging Operator
docker build https://github.com/mvimplis2013/machine-learning-python.git#master:docker/messaging -t messaging-operator:0.0.2

# Build Docker Image for Monitoring Operator
docker build https://github.com/mvimplis2013/machine-learning-python.git#master:docker/monitoring -t system-monitoring:0.0.2

# Run Kubeadmin Worker Join Command
cd ~/
touch bootstrap-token-cri.sh
sed 's/$/ --cri-socket unix:\/\/\/run\/cri-dockerd.sock/' bootstrap-token-for-worker.sh >> bootstrap-token-cri.sh
chmod a+x ./bootstrap-token-cri.sh
./bootstrap-token-cri.sh

