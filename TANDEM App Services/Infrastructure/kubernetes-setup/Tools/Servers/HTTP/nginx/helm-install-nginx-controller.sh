helm repo add bitnami https://charts.bitnami.com/bitnami

# I am using a custom Kubernetes Cluster ==> No LoadBalancer is Integrated (unlike AWS , Google Cloud)
# I can only use NodePort 
helm install bitnami/nginx-ingress-controller --debug --generate-name --wait --set service.type=NodePort --set livenessProbe.enabled=false --set readinessProbe.enabled=false
