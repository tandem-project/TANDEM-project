helm repo add bitnami https://charts.bitnami.com/bitnami

helm install --set persistence.enabled=false --set metrics.enabled=true --set metrics.serviceMonitor.enabled=true --set auth.username=tandem --set auth.password=tandem123 --set service.type=NodePort --set service.nodePorts.amqp='31123' rabbitmq bitnami/rabbitmq
#--set service.clusterIP=10.104.236.228 rabbitmq bitnami/rabbitmq
