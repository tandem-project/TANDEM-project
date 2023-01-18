#!/bin/bash

gcloud auth activate-service-account learning-cloud@appspot.gserviceaccount.com --key-file=learning-cloud-226142d8e000.json

gcloud auth configure-docker
