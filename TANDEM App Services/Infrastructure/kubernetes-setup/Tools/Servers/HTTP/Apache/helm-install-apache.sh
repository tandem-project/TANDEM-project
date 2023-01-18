#!/bin/bash

helm repo add bitnami https://charts.bitnami.com/bitnami

helm install bitnami/apache --debug --generate-name --wait --set service.type=NodePort --set service.nodePorts.http=30818

helm list

#export NODE_PORT=$(kubectl get --namespace default -o jsonpath="{.spec.ports[0].nodePort}" services apache-1660315952)
#export NODE_IP=$(kubectl get nodes --namespace default -o jsonpath="{.items[0].status.addresses[0].address}")
#echo http://$NODE_IP:$NODE_PORT/
