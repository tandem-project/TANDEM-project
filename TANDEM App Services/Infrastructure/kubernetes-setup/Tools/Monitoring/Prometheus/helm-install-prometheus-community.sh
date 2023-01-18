#!/bin/bash

# ************* Prometheus Community ******************
# Get Repo Info
#helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
#helm repo update

# Install Chart
#helm install --set alertmanager.persistentVolume.enabled=false --set kubeStateMetrics.enabled=true --set server.persistentVolume.enabled=false --set pushgateway.enabled=false prometheus prometheus-community/prometheus

# *************** Bitnami *******************
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

helm install --set exporters.node-exporter.enabled=false --set exporters.kube-state-metrics.enabled=false  --set operator.hostNetwork=tr\
ue --set operator.livenessProbe.enabled=false prometheus bitnami/kube-prometheus

