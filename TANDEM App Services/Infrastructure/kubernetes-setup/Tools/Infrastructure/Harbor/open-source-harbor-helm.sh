#!/bin/bash

#helm repo add harbor https://helm.goharbor.io
#helm repo list

# Use Harbor packaged by Bitnami
# ------------------------------
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# Install the chart
#helm install --set persistence.enabled=false --set expose.type=nodePort harbor harbor/harbor

helm install --set persistence.enabled=false --set core.readinessProbe.timeoutSeconds=15 --set redis.master.persistence.enabled=false --set postgresql.primary.persistence.enabled=false harbor-bitnami bitnami/harbor

# List pods 
kubectl get pods
