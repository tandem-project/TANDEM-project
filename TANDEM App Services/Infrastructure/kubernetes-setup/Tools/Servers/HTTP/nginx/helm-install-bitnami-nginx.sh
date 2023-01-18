#!/bin/bash

helm repo add bitnami https://charts.bitnami.com/bitnami

helm install --set service.type=NodePort nginx-bitnami bitnami/nginx
