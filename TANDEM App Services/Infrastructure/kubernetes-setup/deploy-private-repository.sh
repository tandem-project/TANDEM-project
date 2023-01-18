#!/bin/bash

kubectl create -f deployments/private-registry.yaml -n tandem

kubectl get deployments -n tandem 

# Filter by Label
#kubectl get pods -l name=priva
kubectl get pods -n tandem -o wide --show-labels

kubectl get pods -n tandem -l app=private-repository-k8s
