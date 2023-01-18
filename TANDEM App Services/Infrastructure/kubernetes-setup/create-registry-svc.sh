#!/bin/bash

# Create kubernetes service
kubectl create -f deployments/private-registry-svc.yaml -n tandem

# List services in TANDEM namespace
kubectl get svc -n tandem -o wide --show-labels
