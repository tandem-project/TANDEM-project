#!/bin/bash

# Add the Jaeger Tracing Helm Repository
helm repo add jaegertracing https://jaegertracing.github.io/helm-charts
helm repo update
helm repo list

# Install JAEGER Release 
#helm install --set provisionDataStore.cassandra=false jaeger jaegertracing/jaeger
helm install --set query.service.type=NodePort --set query.service.nodePort=31164 jaeger jaegertracing/jaeger

# Wait until pod is running
sleep 2m

#You can log into the Jaeger Query UI here:
#export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/instance=jaeger,app.kubernetes.io/component=query" -o jsonpath="{.items[0].metadata.name}")

#echo http://127.0.0.1:8080/
#kubectl port-forward --namespace default $POD_NAME 8080:16686

#helm show values elastic/elasticsearch
