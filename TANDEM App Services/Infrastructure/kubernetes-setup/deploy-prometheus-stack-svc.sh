#!/bin/bash

kubectl create -f tandem/prometheus-stack-manifest.yaml -n tandem

kubectl get svc -n tandem 

# Go to ... http://localhost:3000
# Enter the default credentials ... Login-Page
# echo "Grafana Login Page: admin/prom-operator"
