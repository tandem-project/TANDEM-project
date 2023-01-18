#!/bin/bash

helm repo add bitnami https://charts.bitnami.com/bitnami

helm repo update

helm repo list

helm install --set redis.enabled=false --set externalRedis.host=10.108.32.220 --set postgresql.enabled=false --set externalDatabase.host=10.96.174.67 --set externalDatabase.user=bn_airflow --set externalDatabase.password=bn_airflow --set service.type=NodePort --set service.nodePorts.http=31980 --set worker.image.debug=true --set metrics.enabled=true --set metrics.serviceMonitor.enabled=true --set web.nodeSelector."kubernetes\.io/hostname"=node-1 --set web.baseURL=http://10.0.2.15:31980 airflow bitnami/airflow
#--set auth.username=vibm --set auth.password=vibm123 airflow bitnami/airflow

#--set global.postgresql.auth.password=bn_airflow
