#!/bin/bash

# Get Repository Info
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Install Chart
helm install prometheus-blackbox-exporter prometheus-community/prometheus-blackbox-exporter
