# Create the ARGOCD namespace, which will contain the ArgoCD and associated services
kubectl create namespace argocd

# Download and run the ARGOCD install script provided by the project maintainers
curl --proxy http://icache.intracomtel.com:80 https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifest/install.yaml -O

kubectl apply -n argocd -f /home/vagrant/install.yaml
