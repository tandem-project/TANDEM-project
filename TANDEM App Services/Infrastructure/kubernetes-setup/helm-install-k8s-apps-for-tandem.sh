#!/bin/bash

#packages=("redis" "influxdb" "kube-prometheus-stack")
#packages=("redis" "rabbitmq" "influxdb" "grafana" "consul")
#packages=( "kube-prometheus" )
#packages=( "metrics-server" )
#packages=( "jaeger" )
packages=( "rabbitmq" )
#packages=( "kubeview" )
#packages=( "cassandra" )
#packages=( "airflow" )
#packages=( "redis" )
#packages=( "kube-prometheus-stack" )

for i in "${packages[@]}"
do
    chart="$i"

    #names=("my-redis")
    my_chart="vibm-"$chart

    if [[ $chart == "redis" ]]; then
        #Integrate "Bitnami" application catalog in TANDEM Kubernetes cluster
        helm repo add bitnami https://charts.bitnami.com/bitnami
        helm repo update

        #--set global.storageClass=vibm-local-storage \
        #--set master.persistence.storageClass=vibm-local-storage --set master.persistence.accessModes[0]="ReadWriteMany" \
        #--set-string metrics.podAnnotations."prometheus\.io/path"="/metrics/cluster" \	        
        helm install $my_chart \
             --set master.persistence.enabled=true --set replica.persistence.enabled=false \
             --set master.persistence.existingClaim=local-pvc \
	     --set metrics.enabled=true --set metrics.serviceMonitor.enabled=true \
	     --set-string metrics.podAnnotations."prometheus\.io/scrape"=true \
	     --set-string metrics.podAnnotations."prometheus\.io/port"=9121 \
	     --set metrics.redisTargetHost=vibm-redis-metrics \
             bitnami/$chart
    elif [[ $chart == "cassandra" ]]; then
        helm repo add bitnami https://charts.bitnami.com/bitnami

        helm upgrade --install $my_chart bitnami/$chart --namespace $chart --create-namespace --set persistence.enabled=false \
             --set metrics.enabled=true --set metrics.serviceMonitor.enabled=true --set metrics.serviceMonitor.namespace=tandem --set metrics.image.tag=2.3.8 #--set hostNetwork=true
    elif [[ $chart == "metrics-server" ]]; then
        helm repo add bitnami https://charts.bitnami.com/bitnami
        helm repo update

        helm install $my_chart bitnami/$chart --namespace kube-system --set apiService.create=true --set livenessProbe.enabled=true --set readinessProbe.enabled=true --set rbac.create=true \
             --set hostNetwork=true --set extraArgs.kubelet-insecure-tls=true --set extraArgs.kubelet-preferred-address-types=InternalIP
    elif [[ $chart == "kubeview" ]]; then
        helm repo add kubeview https://benc-uk.github.io/kubeview/charts
        helm repo update

        helm install $my_chart kubeview/$chart --version 0.1.31
    elif [[ $chart == "jaeger" ]]; then
        helm repo add jaegertracing https://jaegertracing.github.io/helm-charts
        helm repo update

        #helm repo add incubator https://kubernetes-charts-incubator.storage.googleapis.com/
        #helm repo update

        #helm install vibm-jaeger incubator/jaeger
        helm install jaeger jaegertracing/jaeger
    elif [[ $chart == "airflow" ]]; then
        helm repo add apache-airflow https://airflow.apache.org
        #helm repo add bitnami https://charts.bitnami.com/bitnami
        helm repo update

        helm upgrade --install airflow --set airflowVersion=2.2.5 --set redis.persistence.storageClassName=local-storage \
             --set dags.persistence.enabled=true --set dags.persistence.accessMode=ReadWriteMany --set dags.persistence.storageClassName=local-storage \
             --set workers.persistence.fixPermissions=true -n tandem apache-airflow/airflow
        #helm install $my_chart --set global.storageClass=local-storage --set bitnami/$chart -n tandem
    elif [[ $chart == "influxdb" ]]; then
        # Add the InfluxData Helm repository
        helm repo add bitnami https://charts.bitnami.com/bitnami

        helm install $my_chart --set persistence.enabled=false --set auth.user.username='tandem' --set auth.user.password='tandem' --set auth.user.bucket='tandem' -n tandem bitnami/$chart
    elif [[ $chart == "kube-prometheus-stack" ]]; then
        helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
        helm repo update
        helm search repo prometheus-community/kube-prometheus-stack

        helm install $my_chart prometheus-community/kube-prometheus-stack #-n tandem

        #kubectl --namespace tandem get pods -l "release=vibm-kube-prometheus-stack"

        #Visit https://github.com/prometheus-operator/kube-prometheus for instructions on how to create & configure Alertmanager and Prometheus instances using the Operator.
    elif [[ $chart == "rabbitmq" ]]; then
        helm repo add bitnami https://charts.bitnami.com/bitnami

        helm install $my_chart --set persistence.enabled=false --set metrics.enabled=true -n tandem bitnami/rabbitmq

        #RABBITMQ_PASSWORD=$(kubectl get secret --namespace default $my_chart -o jsonpath="{.data.rabbitmq-password}" | base64 --decode)
        #export RABBITMQ_PASSWORD

        #RABBITMQ_SERVICE="${my_chart}".default.svc
        #export RABBITMQ_SERVICE
    elif [[ $chart == "grafana" ]]; then
        helm repo add grafana https://grafana.github.io/helm-charts
        helm repo update

        helm install $my_chart grafana/$chart
    elif [[ $chart == "consul" ]]; then
        #helm repo add hashicorp https://helm.releases.hashicorp.com
        helm repo add bitnami https://charts.bitnami.com/bitnami
        helm repo update

        #helm search repo hashicorp/consul
        helm search repo bitnami/consul

        helm install vibm-consul hashicorp/consul --set persistence.enabled=false --create-namespace -n consul

        helm status vibm-consul -n consul
        helm get all vibm-consul -n consul
    elif [[ $chart == "kube-prometheus" ]]; then
        helm repo add bitnami https://charts.bitnami.com/bitnami
        helm repo update
        helm search repo bitnami/kube-prometheus

        helm install vibm-prometheus bitnami/kube-prometheus -n tandem

        kubectl get deploy -w --namespace tandem -l app.kubernetes.io/name=kube-prometheus-operator,app.kubernetes.io/instance=vibm-prometheus
        kubectl get sts -w --namespace tandem -l app.kubernetes.io/name=kube-prometheus-prometheus,app.kubernetes.io/instance=vibm-prometheus

        #Access Prometheus from cluster ... vibm-prometheus-kube-prome-prometheus.tandem.svc.cluster.local:9090
        #Access Prometheus from outside:
        #  kubectl port-forward --namespace tandem svc/vibm-prometheus-kube-prome-prometheus 9090:9090
        #  http://127.0.0.1:9090/
        #Access Alert-Manager from cluster ... vibm-prometheus-kube-prome-alertmanager.tandem.svc.cluster.local:9093
        #Access Alert-Manager from ouside:
        #   kubectl port-forward --namespace tandem svc/vibm-prometheus-kube-prome-alertmanager 9093:9093
        #   Alertmanager URL: http://127.0.0.1:9093/
    fi

done

