#!/bin/sh

plugins=$(vagrant plugin list)
echo 'Installed Plugins ...' $plugins

#for pin in ${plugins}; do
#    echo 'Installed Plugin ... ' $pin
#done

vagrant scp /home/vibm/kubernetes/kubernetes-setup/Tandem/parking-space-service/messaging-operator-application.yaml k8s-master:/home/vagrant/tandem/deployments
