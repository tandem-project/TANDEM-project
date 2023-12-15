#!/bin/bash

#KUBE_VERSION=v1.24.11
#KUBE_VERSION=v1.25.0
KUBE_VERSION=v1.26.0
#KUBE_VERSION=v1.25.6
#KUBE_VERSION=v1.29.1

CALICO_VERSION=v3.26.1

#CIDR=10.96.0.0/16
#CIDR=10.200.0.0/16
CIDR=192.168.0.0/10

sudo chmod a+rwx /home/vagrant/

sudo mkdir -p /home/vagrant/.kube/
sudo chmod -R a+rwx /home/vagrant/.kube/

echo "STEP 1: Define Environment Variables for Intracom Proxy"
export HTTP_PROXY=http://icache.intracomtel.com:80
export HTTPS_PROXY=http://icache.intracomtel.com:80
export NO_PROXY=10.96.0.0/8,192.168.0.0/16,$CIDR

echo "Acquire::http::Proxy \"http://icache.intracomtel.com:80/\";" | sudo tee -a /etc/apt/apt.conf

echo -e "use_proxy = on\nhttp_proxy = http://icache.intracomtel.com:80/\nhttps_proxy = http://icache.intracomtel.com:80/" >> .wgetrc

git config --global http.proxy ${HTTP_PROXY}

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

##############################################################################################################
#### Check Procedure at ... kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm #### 
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl

###################################################################
#####      How to Install Specific Version of Kubernetes      ##### 
#####  kubeadm=<version> kubectl=<version> kubelet=<version>  #####
###################################################################
#sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
sudo mkdir -p /etc/apt/keyrings/
sudo chmod a+r /etc/apt/keyrings/

curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-archive-keyring.gpg

# curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apyt-key add -
# echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
# sudo apt update -q && sudo apt install -qy kubelet=<1.26.0-00 kubectl=1.26.0.-00 kubeadm=1.26.0-00

# Query for available versions
curl -s https://packages.cloud.google.com/apt/dists/kubernetes-xenial/main/binary-amd64/Packages | grep -e 'Package' -e 'Version' | awk '{print $2}'

#echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
#echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list
echo "deb [signed-by=/etc/apt/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list

sudo apt-get update

# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Download the KUBEADM / KUBELET and KUBECTL %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

# !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
# !!!! SOS --> Must be Same with KUBE_VERSION !!!
# !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
#sudo apt-get install -qy kubelet=1.26.0-00 kubeadm=1.26.0-00 kubectl=1.26.0-00
#sudo apt-get install -qy kubelet=1.25.6-00 kubeadm=1.25.6-00 kubectl=1.25.6-00
#sudo apt-get install -qy kubelet=1.24.11-00 kubeadm=1.24.11-00 kubectl=1.24.11-00
#sudo apt-get install -qy kubelet=1.25.0-00 kubeadm=1.25.0-00 kubectl=1.25.0-00
# $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
#sudo apt-mark hold kubelet kubeadm kubectl

## Install kubelet kubeadm and kubectl <without version numbers>
echo "Kubernetes Version to Install: ${KUBE_VERSION}"
#read -p "Is Version OK ? "

# Remove First Character from KUBE_VERSION String : v1.24.11 --> 1.24.11
sudo apt-get install -y kubelet="${KUBE_VERSION:1}-00" kubeadm="${KUBE_VERSION:1}-00" kubectl="${KUBE_VERSION:1}-00"
sudo apt-mark hold kubelet kubeadm kubectl

#exit

echo "STEP 2: Check Version Number of Current Stable Release"
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
sudo tar -zxvf  containerd-1.6.4-linux-amd64.tar.gz -C /usr/local

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

#sudo cat /etc/containerd/config.toml

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

GO_VERSION=1.21.4
#sudo curl -fsSLo go1.18.3.linux-amd64.tar.gz https://go.dev/dl/go1.18.3.linux-amd64.tar.gz
sudo curl -fsSLo go"${GO_VERSION}".linux-amd64.tar.gz https://go.dev/dl/go"${GO_VERSION}".linux-amd64.tar.gz
#sudo curl -fsSLo go1.13.linux-amd64.tar.gz https://go.dev/dl/go1.13.linux-amd64.tar.gz

sudo rm -rf /usr/local/go/
sudo tar -C /usr/local -xzf go"${GO_VERSION}".linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin

# Verify Installation
go version
printf '\n'

echo '!!!! Setup GOPATH environment variable !!!'
sudo mkdir -p go/bin
sudo mkdir -p go/pkg
sudo mkdir -p go/src
sudo chmod -R a+rwx /home/vagrant/go/
# SOS
export GOPATH='/home/vagrant/go/'

printf '********************************\nCRI Interface for Docker Engine\n********************************\n'
#sudo update-ca-certificates

sudo curl -fsLo crictl-v1.28.0-linux-amd64.tgz https://github.com/kubernetes-sigs/cri-tools/releases/download/v1.28.0/crictl-v1.28.0-linux-amd64.tar.gz
sudo tar zxvf crictl-v1.28.0-linux-amd64.tgz -C /usr/local/bin/
#cd cri && ls
crictl --version

echo "***************** go build ****************"

# How to install & use crictl-dockerd
#####################################
# Download TAR file
# -----------------
sudo apt install -y build-essential
sudo git clone https://github.com/Mirantis/cri-dockerd.git

cd cri-dockerd/

sudo make cri-dockerd

sudo mkdir -p /usr/local/bin

#exit 1

#sudo curl -fsSLo cri-dockerd-0.3.7.amd64.rpm https://github.com/Mirantis/cri-dockerd/releases/download/v0.3.7/cri-dockerd-0.3.7.20231027185657.170103f2-0.el7.x86_64.rpm
#sudo curl -fsLo cri-dockerd-0.3.7.amd64.tgz https://github.com/Mirantis/cri-dockerd/releases/download/v0.3.7/cri-dockerd-0.3.7.amd64.tgz
#exit 1

# Extract the file
# ----------------
#sudo tar zxvf cri-dockerd-0.3.7.amd64.tgz # -C /usr/local/bin/

# Install command
# ---------------
sudo install -o root -g root -m 0755 cri-dockerd /usr/local/bin/cri-dockerd

# Check version
# -------------
#cri-dockerd --version

#go mod tidy
#exit 1

#sudo chmod a+wrx -R /home/vagrant/cri-dockerd/

#exit 1

#go build -o bin/cri-dockerd

# Run these commands as ROOT

sudo install packaging/systemd/* /etc/systemd/system
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

crictl pull --creds vibm69:firewind busybox
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


# $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$  KUBEADM INIT $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

echo "STEP 3: Initialize Kubernetes Cluster - Setup Control Plane"
#sudo kubeadm init --apiserver-advertise-address="192.168.50.10" --apiserver-cert-extra-sans="192.168.50.10" --node-name k8s-master --pod-network-cidr=192.168.0.0/16 --service-cidr="10.96.#0.0/12" --kubernetes-version v1.23.1
#sudo kubeadm init --apiserver-advertise-address="192.168.50.10" --apiserver-cert-extra-sans="192.168.50.10" --node-name k8s-master --pod-network-cidr=10.244.0.0/16 --kubernetes-version v1.23.6
#sudo kubeadm init --cri-socket unix:///run/cri-dockerd.sock --apiserver-advertise-address="192.168.56.10" --apiserver-cert-extra-sans="192.168.5#6.10" --node-name k8s-master --pod-network-cidr=10.244.0.0/16 --kubernetes-version ${KUBE_VERSION}

# CALICO 
#sudo kubeadm init --cri-socket unix:///run/cri-dockerd.sock --apiserver-advertise-address="192.168.56.10" --apiserver-cert#-extra-sans="192.168.56.10" --node-name k8s-master --pod-network-cidr=192.168.0.0/16 --kubernetes-version ${KUBE_VERSION}

# 192.168.56.0 is already used by Vagrant
#sudo kubeadm init --cri-socket unix:///run/cri-dockerd.sock --apiserver-advertise-address="192.168.56.10" --pod-network-cidr="10.244.0.0/16" --node-name k8s-master --kubernetes-version ${KUBE_VERSION}
echo Hello, Ready to Run "kubeadm init"
#read -p 'Do you Agree : ' answer

sudo kubeadm init --cri-socket unix:///run/cri-dockerd.sock --apiserver-advertise-address="192.168.56.10" --pod-network-cidr="$CIDR" --node-name k8s-master --kubernetes-version ${KUBE_VERSION}
#sudo kubeadm init --cri-socket unix:///run/cri-dockerd.sock --pod-network-cidr="$CIDR" --node-name k8s-master --kubernetes-version ${KUBE_VERSION}

#sudo kubeadm init --cri-socket unix:///run/cri-dockerd.sock --pod-network-cidr=192.168.0.0/16 --node-name k8s-master
#sudo kubeadm init --cri-socket unix:///run/cri-dockerd.sock --apiserver-advertise-address="192.168.56.10" --pod-network-cidr="192.168.0.0/16" --node-name k8s-master --kubernetes-version ${KUBE_VERSION}  

#exit
# *********************************************************************************************************************************

echo "STEP 4: Enable Vagrant User to Access Kubernetes Cluster"
sudo mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

#exit

echo "STEP 5: Setup Container Networking Provider and Policy Engine"
#sudo curl -L https://docs.projectcalico.org/manifests/calico.yaml -o /home/vagrant/calico.yaml
#sudo curl -L https://raw.githubusercontent.com/projectcalico/calico/v3.25.0/manifests/custom-resources.yaml -o /home/vagrant/custom-resources.yaml

#sed 's/^cidr: \).*$/\$CIDR/' /home/vagrant/custom-resources.yaml

# **** Install YQ on Ubuntu 22.04 ***
#sudo wget -qO /usr/local/bin/yq https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64
#sudo chmod a+x /usr/local/bin/yq
#yq --version

#sudo touch /home/vagrant/custom-resources-F.yaml
#sudo chmod a+rwx /home/vagrant/custom-resources-F.yaml

#yq e '.spec.calicoNetwork.ipPools[0].cidr |= $CIDR' /home/vagrant/custom-resources.yaml > /home/vagrant/custom-resources-F.yaml
#echo "==> Content of Custom-Resources.YAML"
#cat /home/vagrant/custom-resources.yaml

#kubectl apply -f /home/vagrant/calico.yaml
#kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml
#kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.25.0/manifests/tigera-operator.yaml
#exit

kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/${CALICO_VERSION}/manifests/tigera-operator.yaml

#sudo rm /home/vagrant/custom-resources.yaml
#kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/${CALICO_VERSION}/manifests/custom-resources.yaml

sudo wget -qO /home/vagrant/custom-resources.yaml https://raw.githubusercontent.com/projectcalico/calico/${CALICO_VERSION}/manifests/custom-resources.yaml
sudo chmod a=rwx /home/vagrant/custom-resources.yaml

#sudo sh -c "yq eval '.spec.calicoNetwork.ipPools[].cidr = \"10.200.0.0/16\"' /home/vagrant/custom-resources.yaml >> /home/vagrant/custom-resources.yaml.10.200"

#exit

kubectl create -f /home/vagrant/custom-resources.yaml

#echo "STEP 6: Kubectl Shows Ready ?"
#watch kubectl get nodes 

echo "STEP 7: Create a bootstrap token for Worker-Nodes to Join"

sudo touch /home/vagrant/bootstrap-token-for-worker.sh
sudo chmod a=rwx /home/vagrant/bootstrap-token-for-worker.sh

kubeadm token create --print-join-command >> /home/vagrant/bootstrap-token-for-worker.sh


