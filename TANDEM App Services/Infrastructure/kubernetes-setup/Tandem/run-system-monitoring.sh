# Delete previous deployments
kubectl delete -f tandem/deployments/system-monitoring-application.yaml -n tandem

# DATA-WATCHDOG pod
FILE="tandem/deployments/system-monitoring-application.yaml"
kubectl create -f $FILE -n tandem

#kubectl get pods -n tandem --watch
kubectl get pods -n tandem