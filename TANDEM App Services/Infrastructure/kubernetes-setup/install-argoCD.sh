#!/bin/sh

# Create a new workspace
kubectl create namespace argocd

# Install Argo-CD components
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Monitor status of Argo-CD Pods
watch kubectl get pods -n argocd   # 5 Pods wait for READY

# Get the latest version
curl https://api.github.com/repos/argoproj/argo-cd/releases/latest | grep tag_name #v2.2.3

sudo curl -sSL -o /usr/local/bin/argocd https://github.com/argoproj/argo-cd/releases/download/v2.2.3/argocd-linux-amd64
sudo chmod +x /usr/local/bin/argocd

# Check Installation of CLI
argocd version

# Edit the the "argocd-server" Service
kubectl get services -n argocd # can you see argocd-server ?

# Change its type to LoadBalancer to get access to WebUI from the world - patch svc (service)
kubectl -n argocd patch svc argocd-server -p '{"spec": {"type": "LoadBalancer"}}'

# Get the URL of argoCD-server
kubectl -n argocd get svc argocd-server # 10.107.217.184:80

# Get the password for ArgoCD
kubectl -n argocd get secrets

kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64-d; echo #tP8WYuXSpQPkI-Ok

# Login via CLI
argocd login 10.107.217.184

# Change the password
argocd account update password # p@ssw0rd123

