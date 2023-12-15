#!/bin/bash

export HTTP_PROXY=http://icache.intracomtel.com:80/
export HTTPS_PROXY=http://icache.intracomtel.com:80/

export http_proxy=http://icache.intracomtel.com:80/
export https_proxy=http://icache.intracomtel.com:80/

export NO_PPROXY=192.168.56.10
export no_proxy=192.168.56.10

MASTER_SERVICE_NODE_PORT=18001

helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm repo list

#helm install --set master.persistence.enabled=false --set replica.persistence.enabled=false --set auth.enabled=true --set auth.password=tandem123 --set master.service.clusterIP="10.108.32.220" --set master.service.ports.redis=6379 --set metrics.enabled=true --set metrics.serviceMonitor.enabled=true redis bitnami/redis

helm install --set master.persistence.enabled=false --set replica.persistence.enabled=false --set auth.enabled=false --set master.service.type=NodePort --set master.service.nodePorts.redis=31961 --set metrics.enabled=true --set metrics.serviceMonitor.enabled=true redis bitnami/redis
