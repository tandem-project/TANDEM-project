#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo Which Part of the script should I run ?
    exit 0
fi

if [ "$1" -eq 1 ]; then
    kubectl create -f /home/vagrant/grpc/recommendations-demo/kubernetes.yaml
    kubectl get pods --watch=true

    echo Ready to create the Recommendations-Microservices
    exit 0
fi

if [ "$1" -eq 2 ]; then
    kubectl get ep

    echo Define the  Marketplace-Endpoint:
    read marketplaceep

    no_proxy="$marketplaceep" lynx "$marketplaceep"
fi
