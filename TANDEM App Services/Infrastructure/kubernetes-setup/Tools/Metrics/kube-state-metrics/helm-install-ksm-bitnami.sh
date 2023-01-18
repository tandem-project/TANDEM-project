#!/bin/bash

helm repo add bitnami https://charts.bitnami.com/bitnami

helm install --set service.type=ClusterIP --set hostNetwork=true --set replicaCount=2 kube-state-metrics bitnami/kube-state-metrics

#helm delete kube-state-metrics
