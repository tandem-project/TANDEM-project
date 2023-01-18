# Delete previous deployments
kubectl delete -f tandem/deployments/frame-grabber-application.yaml -n tandem 

K8S_YAML_0="tandem/deployments/"

# FRAME-GRABBER pod
FILE=$K8S_YAML_0"frame-grabber-application.yaml"

kubectl create -f $FILE -n tandem 

#kubectl get pods -n tandem --watch
kubectl get pods -n tandem
