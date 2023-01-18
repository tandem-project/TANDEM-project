#!/bin/sh

FILE=https://raw.githubusercontent.com/argoproj/argo-workflows/master/manifests/quick-start-postgres.yaml
EXAMPLE=https://raw.githubusercontent.com/argoproj/argo-workflows/master/examples/hello-world.yaml

ARGOLINUX=https://github.com/argoproj/argo-workflows/releases/download/v3.3.1/argo-linux-amd64.gz
ARGOFILE=argo-linux-amd64.gz

# Install Argo-Workflows into Kubernetes Cluster
kubectl create ns argo
kubectl apply -n argo -f $FILE

# Downlaod the latest Argo CLI
curl -sLO $ARGOLINUX

# Unzip the binary
gunzip $ARGOFILE

# Make a binary executable
chmod u+x argo-linux-amd64

# Move binary to path
sudo mv ./argo-linux-amd64 /usr/local/bin/argo

# Test Installation
argo version

# Finally, submit an example workflow:
argo submit -n argo --watch $EXAMPLE

# List all the submitted Workflows
argo list -n argo

# Review details about of a Workflow run
argo logs -n argo @latest

# Start the Server on port 2746 ... http://10.124.35.24:1800/ [Port Forwarded]
#argo server --secure=false --auth-mode=server

#watch kubectl get pods -n argo
#watch kubectl get services -n argo

# Submt the "Hello-Work" workflow
# kubectl create -n argo -f $EXAMPLE

# Argo Workflow is implemented as a Kubernetes CRD (Custom Resource Definition) - ArgoWorkflows can also be managed with kubectl
#kubectl get wf # -n argo
#kubectl get wf hello-world-?????
#kubectl get pods --selector=workflows.argoproj.io/workflow=hello-world-????? --show-all
# Print the Logs for Main-Container
#kubectl logs hello-world-????? -c main
