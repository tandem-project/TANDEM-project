#!/bin/bash

export HTTP_PROXY=http://icache.intracomtel.com:80/
export HTTPS_PROXY=http://icache.intracomtel.com:80/

export http_proxy=http://icache.intracomtel.com:80/
export https_proxy=http://icache.intracomtel.com:80/

export NO_PPROXY=192.168.56.10
export no_proxy=192.168.56.10

helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

#-v 20
helm install --set operator.livenessProbe.enabled=false --set operator.readinessProbe.enabled=false --set prometheus.service.type=NodePort --set prometheus.service.nodePorts.http=31300 --set-file additionalScrapeConfigs=/home/vagrant/Tools/Monitoring/Prometheus/extraScrapeConfigs.yaml prometheus bitnami/kube-prometheus
