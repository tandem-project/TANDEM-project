# Delete previous deployments
kubectl delete -f /home/vagrant/tandem/deployments/messaging-operator-application.yaml -n tandem

# DATA-WATCHDOG pod
FILE="/home/vagrant/tandem/deployments/messaging-operator-application.yaml"
kubectl create -f $FILE -n tandem

#kubectl get pods -n tandem --watch
