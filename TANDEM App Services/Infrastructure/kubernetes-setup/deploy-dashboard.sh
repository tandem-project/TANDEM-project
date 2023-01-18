#!/bin/sh

echo "STEP 1: Define Environment Variables for Intracom Proxy"
export HTTP_PROXY=http://icache.intracomtel.com:80
export HTTPS_PROXY=http://icache.intracomtel.com:80
export NO_PROXY=192.168.0.0/16,10.96.0.0/16

# Metrics server installation
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# ... Try to run kubectl nodes
#kubectl top nodes
# ... Error from server (ServiceUnavailable): the server is currently unable to handle the request (get nodes.metrics.k8s

# ... Is metrics-server running ???
#kubectl get pods -n kube-system -o wide
# ... metrics-server-659cd96594-trw6f  0/1 Running AGE IP=10.244.13.23

# ... Is reachable ?
#ping 10.244.13.23 -c 1

#kubectl get svc -n kube-system
# ... metrics-server 01/ Running

# Show logs to understand the error
#kubectl logs -n kube-system deploy/metrics-server
# ERROR cannot validate certificates for XXXXXXXX because it doesn't contain any IP SANs

# Need to Edit the Deployment YAML File
# *********************************************
#kubectl edit deploy -n kube-system kube-server
# *********************************************
#Under spec.template.spec.containers add:
# On the SAME level as name: metrics-server
# args:
# - --kubelet-insecure-tls
#<Save File>

#Wait for 10-15 secs and rerun
#kubectl top nodes

#curl https://raw.githubusercontent.com/kubernetes/dashboard/v2.5.0/aio/deploy/recommended.yaml -O
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.5.0/aio/deploy/recommended.yaml

 
