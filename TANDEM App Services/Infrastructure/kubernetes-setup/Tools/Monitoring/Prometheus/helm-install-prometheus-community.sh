#!/bin/bash

export HTTP_PROXY=http://icache.intracomtel.com:80/
export HTTPS_PROXY=http://icache.intracomtel.com:80/

export http_proxy=http://icache.intracomtel.com:80/
export https_proxy=http://icache.intracomtel.com:80/

export NO_PPROXY=192.168.56.10
export no_proxy=192.168.56.10

# ************* Prometheus Community ******************
# Get Repo Info
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm install kube-state-metrics prometheus-community/kube-state-metrics

# Install Chart
#helm install --set alertmanager.persistentVolume.enabled=false --set kube-state-metrics.enabled=false --set server.persistentVolume.enabled=false --set pushgateway.enabled=false prometheus prometheus-community/prometheus

# *************** Bitnami *******************
#helm repo add bitnami https://charts.bitnami.com/bitnami
#helm repo update

#helm install --set exporters.node-exporter.enabled=false --set exporters.kube-state-metrics.enabled=false  --set operator.hostNetwork=tr\
#ue --set operator.livenessProbe.enabled=false prometheus bitnami/kube-prometheus

