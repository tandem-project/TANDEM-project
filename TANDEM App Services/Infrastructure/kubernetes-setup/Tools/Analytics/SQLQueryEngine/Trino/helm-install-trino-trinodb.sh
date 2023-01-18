#!/bin/bash

# Add Repository
helm repo add trino https://trinodb.github.io/charts/
helm repo update

# Install Chart
helm install --set service.type=NodePort trino trino/trino --version 0.8.0

export NODE_PORT=$(kubectl get --namespace default -o jsonpath="{.spec.ports[0].nodePort}" services trino)
export NODE_IP=$(kubectl get nodes --namespace default -o jsonpath="{.items[0].status.addresses[0].address}")

echo http://$NODE_IP:$NODE_PORT

no_proxy="*" lynx "http://$NODE_IP:$NODE_PORT" 
