#!/bin/bash

helm repo add bitnami https://charts.bitnami.com//bitnami
helm repo update
helm repo list

#helm install --set master.persistence.enabled=false --set replica.persistence.enabled=false --set auth.enabled=true --set auth.password=tandem123 --set master.service.clusterIP="10.108.32.220" --set master.service.ports.redis=6379 --set metrics.enabled=true --set metrics.serviceMonitor.enabled=true redis bitnami/redis

helm install --set master.persistence.enabled=false --set replica.persistence.enabled=false --set auth.enabled=false --set master.service.clusterIP="10.108.32.220" --set master.service.ports.redis=6379 --set metrics.enabled=true --set metrics.serviceMonitor.enabled=true redis bitnami/redis
