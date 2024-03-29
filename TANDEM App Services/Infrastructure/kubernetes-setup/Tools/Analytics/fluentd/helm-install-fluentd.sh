#!/bin/bash

helm repo add bitnami https://charts.bitnami.com/bitnami
helm update

#helm install bitnami/fluentd --generate-name --debug --wait
#helm install fluentd bitnami/fluentd --debug --wait

helm install --set metrics.enabled=true --set metrics.serviceMonitor.enabled=true fluentd bitnami/fluentd

helm list

#helm show 
#kubectl get all -l "app.kubernetes.io/name=fluentd,app.kubernetes.io/instance=fluentd-1660299839"
#kubectl logs -l "app.kubernetes.io/component=aggregator"
