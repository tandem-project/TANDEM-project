helm install bitnami/mongodb --debug --generate-name --wait --set persistence.enabled=false

#MongoDB&reg; can be accessed on the following DNS name(s) and ports from within your cluster:

#    mongodb-1660316723.default.svc.cluster.local

#To get the root password run:

#    export MONGODB_ROOT_PASSWORD=$(kubectl get secret --namespace default mongodb-1660316723 -o jsonpath="{.data.mongodb-root-password}" | base64 -d)

#To connect to your database, create a MongoDB&reg; client container:

#    kubectl run --namespace default mongodb-1660316723-client --rm --tty -i --restart='Never' --env="MONGODB_ROOT_PASSWORD=$MONGODB_ROOT_PASSWORD" --image docker.io/bitnami/mongodb:6.0.0-debian-11-r0 --command -- bash

#Then, run the following command:
#    mongosh admin --host "mongodb-1660316723" --authenticationDatabase admin -u root -p $MONGODB_ROOT_PASSWORD

#To connect to your database from outside the cluster execute the following commands:

#    kubectl port-forward --namespace default svc/mongodb-1660316723 27017:27017 &
#    mongosh --host 127.0.0.1 --authenticationDatabase admin -p $MONGODB_ROOT_PASSWORD
