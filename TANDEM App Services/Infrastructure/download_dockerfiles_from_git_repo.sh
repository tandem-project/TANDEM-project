#!/bin/bash

cd /tmp/

if [ ! -d "/tmp/machine-learning-python/" ]; then
    cd /tmp/ && git clone http://github.com/mvimplis2013/machine-learning-python.git
else
    echo "Repository already exists"
fi    

