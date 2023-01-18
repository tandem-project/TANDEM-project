#!/bin/bash

helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

helm install --set persistence.enabled=false pytorch bitnami/pytorch
