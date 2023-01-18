#!/bin/bash

helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

helm install --set prometheus.service.type=NodePort --set prometheus.service.nodePorts.http=31300 --set-file additionalScrapeConfigs=/home/vagrant/Tools/Monitoring/Prometheus/extraScrapeConfigs.yaml prometheus bitnami/kube-prometheus
