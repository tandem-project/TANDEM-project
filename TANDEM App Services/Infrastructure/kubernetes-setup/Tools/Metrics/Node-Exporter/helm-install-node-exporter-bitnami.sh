#!/bin/bash

helm repo add bitnami https://charts.bitnami.com/bitnami

helm install node-exporter bitnami/node-exporter
