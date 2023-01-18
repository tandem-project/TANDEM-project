#!/bin/bash

helm repo add bitnami https://charts.bitnami.com/bitnami

helm repo update

helm repo list

helm install --set primary.persistence.enabled=false --set primary.service.clusterIP=10.96.174.67 --set auth.username=bn_airflow --set auth.password=bn_airflow --set auth.database=bitnami_airflow --set metrics.enabled=true --set metrics.serviceMonitor.enabled=true postgresql bitnami/postgresql
