#!/bin/bash

http_proxy=http://icache.intracomtel.com:80 apt update

http_proxy=http://icache.intracomtel.com:80 apt-get install -y apt-transport-https ca-certificates gnupg

# Add package source
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

# Import the Google Cloud public key
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg -x http://icache.intracomtel.com:80 | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -

# Update and install the Cloud SDK
http_proxy=http://icache.intracomtel.com:80 apt update && http_proxy=http://icache.intracomtel.com:80 apt-get install -y google-cloud-sdk
