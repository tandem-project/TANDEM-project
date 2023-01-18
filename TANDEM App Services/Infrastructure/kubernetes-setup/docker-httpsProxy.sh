#!/bin/bash

mkdir -p /etc/systemd/system/docker.service.d/
touch /etc/systemd/system/docker.service.d/http-proxy.conf

# Create SYSTEMD Directory 
(
cat <<-EOF
[Service]
Environment="HTTP_PROXY=http://icache.intracomtel.com:80"
Environment="HTTPS_PROXY=http://icache.intracomtel.com:80"
Environment="NO_PROXY=192.168.0.0/16,10.244.0.0/16"
EOF
) | tee -a /etc/systemd/system/docker.service.d/http-proxy.conf

systemctl daemon-reload
systemctl restart docker

# The following command makes ansible to halt - Do Not Use It !!!
#systemctl show --property=Environment docker

