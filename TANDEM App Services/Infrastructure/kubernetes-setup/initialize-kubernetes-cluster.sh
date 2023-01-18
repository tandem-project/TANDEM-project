#!/bin/bash

#KUBE_VERSION=v1.24.2
KUBE_VERSION=v1.25.0

echo "STEP 1: Define Environment Variables for Intracom Proxy"
export HTTP_PROXY=http://icache.intracomtel.com:80
export HTTPS_PROXY=http://icache.intracomtel.com:80
export NO_PROXY=192.168.0.0/16,10.96.0.0/16

# Forwarding IPv4 and letting iptables see bridged traffic
#echo "--> Is BR_NETFILTER Module Loaded ? "$(lsmod | br_netfilter)
#echo "--> Load Manually ..."$(sudo modprobe br_netfilter)

# Update SYSCTL config files ...
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter

# systemctl params required by steup, params persist across reboots
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables   = 1
net.bridge.bridge-nf-call-ipo6tables = 1
net.ipv4.ip_forward                  = 1
EOF

# Apply systctl params without reboot
sudo sysctl --system

sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl

sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg

echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list

sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl

echo "STEP 2: Check Verison Number of Current Stable Release"
curl https://storage.googleapis.com/kubernetes-release/release/stable-1.txt -O
echo "\nLatest Stable Kubernetes Version is:"
cat stable-1.txt
echo "\nCurrent Install Version is: ${KUBE_VERSION}"
echo "\n"

echo "!!! Ubuntu Init System --> SYSTEMD !!!"
echo "... ContainerRuntime &*& KUBELET must use same CGROUP DRIVER ..."

echo "Container Runtime --> CONTAINERD"
#sudo systemctl status containerd.service --no-pager

sudo systemctl disable containerd.service

wget https://github.com/containerd/containerd/releases/download/v1.6.4/containerd-1.6.4-linux-amd64.tar.gz
sudo tar Czxvf /usr/local containerd-1.6.4-linux-amd64.tar.gz

wget https://raw.githubusercontent.com/containerd/containerd/main/containerd.service
#sudo mv containerd.service /usr/lib/systemd/system/
sudo mv containerd.service /lib/systemd/system/

sudo systemctl daemon-reload
sudo systemctl enable --now containerd

sudo systemctl status containerd

sudo systemctl status docker.service --no-pager
sudo systemctl cat docker --no-pager

#ctr --help
ctr --version
#runc --help
runc --version

sudo mkdir -p /opt/cni/bin/
sudo curl -fsSLo /opt/cni/bin/cni-plugins-linux-amd64-v1.1.1.tgz https://github.com/containernetworking/plugins/releases/download/v1.1.1/cni-plugins-linux-amd64-v1.1.1.tgz
sudo tar -xzvf /opt/cni/bin/cni-plugins-linux-amd64-v1.1.1.tgz

echo "Configure the SYSTEMD CGROUP Driver\n-----------------------------------"
sudo bash -c 'echo -e "[plugins.\"io.containerd.grpc.v1.cri\".containerd.runtimes.runc]" >> /etc/containerd/config.toml'
sudo bash -c 'echo "  version = 2" >> /etc/containerd/config.toml'
sudo bash -c 'echo -e "  [plugins.\"io.containerd.grpc.v1.cri\".containerd.runtimes.runc.options]" >> /etc/containerd/config.toml' 
sudo bash -c 'echo "    SystemdCgroup = true" >> /etc/containerd/config.toml'

# Other way to append lineinto file
#echo '' | sudo tee -a /etc/containerd/config.toml

sudo cat /etc/containerd/config.toml

echo 'Apply changes into SYSTEMD service'
sudo systemctl restart containerd
sudo systemctl status containerd --no-pager

echo 'Make Sure that CRI is Not Included in DISABLED_PLUGINS'
sudo sed -i 's/"cri"//' /etc/containerd/config.toml
sudo systemctl restart containerd
sudo systemctl status containerd --no-pager

sudo cat /etc/containerd/config.toml

#crictl ps
#sudo critcl --debug pull nginx:latest

#git clone https://github.com/Mirantis/cri-dockerd.git

#cat /etc/crictl.yaml
#ls /var/run/dockershim.sock
#ls /var/run/docker.sock

#sudo kubeadm config images pull --cri-socket-path unix:///var/run/dockershim.sock

#kubeadm config images pull

printf '********************************\nGO language install in Ubuntu 20\n*******************************\n'
#sudo apt update
#sudo apt upgrade -y

#sudo apt search golang-go
#sudo apt search gccgo-go

#sudo apt install golang-go -y

sudo curl -fsSLo go1.18.3.linux-amd64.tar.gz https://go.dev/dl/go1.18.3.linux-amd64.tar.gz
#sudo curl -fsSLo go1.13.linux-amd64.tar.gz https://go.dev/dl/go1.13.linux-amd64.tar.gz
sudo rm -rf /usr/local/go/
sudo tar -C /usr/local -xzf go1.18.3.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin

# Verify Installation
go version
printf '\n'

echo '!!!! Setup GOPATH environment variable !!!'
sudo mkdir -p go/bin
sudo mkdir -p go/pkg
sudo mkdir -p go/src
sudo chmod -R a=rwx /home/vagrant/go/
# SOS
export GOPATH='/home/vagrant/go/'

printf '********************************\nCRI Interface for Docker Engine\n********************************\n'
sudo git clone https://github.com/Mirantis/cri-dockerd.git
cd cri-dockerd && ls


echo "***************** go build ****************"
go tidy
sudo chmod a=wrx -R /home/vagrant/cri-dockerd/

go build -o bin/cri-dockerd

sudo install -o root -g root -m 0755 bin/cri-dockerd /usr/local/bin/cri-dockerd
sudo cp -a packaging/systemd/* /etc/systemd/system
sudo sed -i -e 's,/usr/bin/cri-dockerd,/usr/local/bin/cri-dockerd,' /etc/systemd/system/cri-docker.service
sudo systemctl daemon-reload
sudo systemctl enable cri-docker.service
sudo systemctl enable --now cri-docker.socket

# CRI-Listens  @
varListen=$(sudo systemctl status cri-docker.socket | grep Listen:)
echo "CRI-Docker-Sokcet ... ${varListen} VS '/run/cri-dockerd.sock'"

cat <<EOF | sudo tee /etc/crictl.yaml
runtime-endpoint: unix:///run/cri-dockerd.sock
image-endpoint: unix:///run/cri-dockerd.sock
EOF

# Pull Image(s)
echo 'Ready to Pull Busybox Image'
docker login -u vibm69 -p firewind

crictl pull busybox
crictl images

# List Containers
crictl -r /run/cri-dockerd.sock -i /run/cri-dockerd.sock ps

#echo "Get GODBUS Release ... v5.0.3"
#go get github.com/probonopd/go-appimage
#cd /home/vagrant/go/src/github.com/probonopd/go-appimage/
#go mod init
#go mod tidy

#grep godbus go.mod

#echo '---> Get dbus@v5 <---'
#go get github.com/godbus/dbus@v5

# Build Errors with Import Statements
# ***********************************
#echo '!!! cannot find package "context" in any of:'
#sed -i 's/"context"/"golang.org\/x\/net\/context"/' ~/go/src/github.com/Mirantis/cri-dockerd/core/container_*.go
#sed -i 's/"context"/"golang.org\/x\/net\/context"/' ~/go/src/github.com/Mirantis/cri-dockerd/core/docker_service.go
#find ~/go/src/ -type f -exec sed -i 's/"context"/"golang.org\/x\/net\/context"/' {} \;

#echo '!!! cannot find package "sigs.k8s.io/structured-merge-diff/v4/..." !!!'
#find ~/go/src/sigs.k8s.io/ -type f -exec sed -i 's/v4//' {} \;
#find ~/go/src/k8s.io/ -type f -exec sed -i 's/v4//' {} \;
#find ~/go/src/ -type f -exec sed -i 's/pkg\/v3\//pkg\//' {} \;
#find ~/go/src -type f -exec sed -i 's/\/go-systemd\/v22\//\/go-systemd\//' {} \;

# emickley
#find ~/go/src -type f -exec sed -i 's/\/go-restful\/v3\//\/go-restful\//' {} \;
#find ~/go/src -type f -exec sed -i 's/\/go-restful\/v3/\/go-restful\//' {} \;

#find ~/go/src -type f -exec sed -i 's/\/cespare\/xxhash\/v2/\/cespare\/xxhash/' {} \;

# etcd
#find ~/go/src/ -type f -exec sed -i 's/\/api\/v3\//\/api\//' {} \;

# dbus
#find ~/go/src/ -type f -exec sed -i 's/\/dbus\/v5/\/dbus/' {} \;

# klog
#find ~/go/src/ -type f -exec sed -i 's/klog\/v2/klog/' {} \;

# End of Build Errors
# (((((((((((((((((((

#sudo systemctl status cri-docker.service

echo "STEP 3: Initialize Kubernetes Cluster - Setup Control Plane"
#sudo kubeadm init --apiserver-advertise-address="192.168.50.10" --apiserver-cert-extra-sans="192.168.50.10" --node-name k8s-master --pod-network-cidr=192.168.0.0/16 --service-cidr="10.96.#0.0/12" --kubernetes-version v1.23.1
#sudo kubeadm init --apiserver-advertise-address="192.168.50.10" --apiserver-cert-extra-sans="192.168.50.10" --node-name k8s-master --pod-network-cidr=10.244.0.0/16 --kubernetes-version v1.23.6
#sudo kubeadm init --cri-socket unix:///run/cri-dockerd.sock --apiserver-advertise-address="192.168.56.10" --apiserver-cert-extra-sans="192.168.5#6.10" --node-name k8s-master --pod-network-cidr=10.244.0.0/16 --kubernetes-version ${KUBE_VERSION}

# CALICO 
#sudo kubeadm init --cri-socket unix:///run/cri-dockerd.sock --apiserver-advertise-address="192.168.56.10" --apiserver-cert#-extra-sans="192.168.56.10" --node-name k8s-master --pod-network-cidr=192.168.0.0/16 --kubernetes-version ${KUBE_VERSION}

# 192.168.56.0 is already used by Vagrant
sudo kubeadm init --cri-socket unix:///run/cri-dockerd.sock --apiserver-advertise-address="192.168.56.10" --pod-network-cidr="10.244.0.0/16" --node-name k8s-master --kubernetes-version ${KUBE_VERSION}  

echo "STEP 4: Enable Vagrant User to Access Kubernetes Cluster"
sudo mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

echo "STEP 5: Setup Container Networking Provider and Policy Engine"
sudo curl https://docs.projectcalico.org/manifests/calico.yaml -o /home/vagrant/calico.yaml
kubectl apply -f /home/vagrant/calico.yaml
#kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml

#echo "STEP 6: Kubectl Shows Ready ?"
#watch kubectl get nodes 

echo "STEP 7: Create a bootstrap token for Worker-Nodes to Join"

sudo touch /home/vagrant/bootstrap-token-for-worker.sh
sudo chmod a=rwx /home/vagrant/bootstrap-token-for-worker.sh

kubeadm token create --print-join-command >> /home/vagrant/bootstrap-token-for-worker.sh


