#!/bin/bash

# Add Traefik's Chart Repository to Helm
helm repo add traefik https://helm.traefik.io/traefik
helm repo update

# Deploy Traefik
helm install traefik traefik/traefik
