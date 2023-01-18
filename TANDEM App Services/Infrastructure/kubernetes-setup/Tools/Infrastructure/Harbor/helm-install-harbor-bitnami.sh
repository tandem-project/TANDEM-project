#!/bin/bash

helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

helm install --set persistence.enabled=false --set postgresql.primary.persistence.enabled=false --set redis.enabled=false --set externalRedis.host="10.108.32.220" --set metrics.enabled=true --set metrics.serviceMonitor.enabled=true --set service.type=NodePort --set service.nodePorts.http=30303 harbor bitnami/harbor  

helm list

