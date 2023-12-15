export HTTP_PROXY=http://icache.intracomtel.com:80/
export HTTPS_PROXY=http://icache.intracomtel.com:80/

export http_proxy=http://icache.intracomtel.com:80/
export https_proxy=http://icache.intracomtel.com:80/

export NO_PPROXY=192.168.56.10
export no_proxy=192.168.56.10

helm repo add bitnami https://charts.bitnami.com/bitnami

#-v 20
helm install --set persistence.enabled=false --set metrics.enabled=true --set metrics.serviceMonitor.enabled=true --set auth.username=tandem --set auth.password=tandem123 --set service.type=ClusterIP --set service.clusterIP=10.104.236.228 rabbitmq bitnami/rabbitmq
#--set service.clusterIP=10.104.236.228 rabbitmq bitnami/rabbitmq
