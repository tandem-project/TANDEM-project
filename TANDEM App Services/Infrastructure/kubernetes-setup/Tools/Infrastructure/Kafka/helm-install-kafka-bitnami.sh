#!/bin/bash

helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

helm install --set persistence.enabled=false --set zookeeper.persistence.enabled=false --set metrics.kafka.enabled=true --set metrics.serviceMonitor.enabled=true --set externalAccess.enabled=true --set externalAccess.service.type=NodePort --set externalAccess.service.nodePorts[0]='31122' --set externalAccess.service.useHostIPs=true kafka bitnami/kafka 
