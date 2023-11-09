# Build image
sudo docker build --build-arg http_proxy=http://icache.intracomtel.com:80/ --build-arg https_proxy=http://icache.intracomtel.com:80/ --no-cache -t predict_api .

sudo docker push --push-arg http_proxy=http://icache.intracomtel.com:80/ --push-arg https_proxy=http://icache.intracomtel.com:80/ gsamaras/infrastructure_predict:predict_api

# Example run
docker exec a1839b3a243f63a6e38c4381d2a63d822c927486eb415b84d4367aa30aecaba9 curl -X GET http://0.0.0.0:5556/predict/localhost/k8smaster/1T/memory+cpu
docker exec 6c074a3a82a63912ba73b5f614fc1f89fd120f645740e13760d700e6a9dbc248 curl -X GET http://0.0.0.0:5556/predict/localhost/tansecond-cluster/1T/memory+cpu+received_throughput+transmitted_throughput
docker exec f84b9cfde40bbac3787a501cef09268d8b302f9dee997500920cd36faeb3f0cd curl -X GET http://0.0.0.0:5556/predict/localhost/k8ssecondary/5T/memory+cpu+received_throughput+transmitted_throughput

# Start container
sudo docker run -d -p 5556:5556 predict_api
Output: container ID, e.g. 58e0c6f0cd6e917094f6dcd1367c963b1a3b9842a6eebf93c045c3e7b5dcec0d

# Get logs of container
docker logs 58e0c6f0cd6e917094f6dcd1367c963b1a3b9842a6eebf93c045c3e7b5dcec0d
docker logs 58e0c6f0cd6e917094f6dcd1367c963b1a3b9842a6eebf93c045c3e7b5dcec0d | grep "stringToSearchFor"

# List running containers:
docker ps -a

# Stop a container
docker stop 58e0c6f0cd6e917094f6dcd1367c963b1a3b9842a6eebf93c045c3e7b5dcec0d

# Remove stopped containers
docker container prune

# Remove dangling images:
docker image prune

# If disk full, free up space by:
docker system prune

# Tag 'n push image:
docker tag predict_api gsamaras/infrastructure_predict:predict_api
sudo docker login -u gsamaras
(kwdikos tou linux lab kai ena papi)
sudo docker push gsamaras/infrastructure_predict:predict_api
Then in the Tandem VM do:
sudo docker pull gsamaras/infrastructure_predict:predict_api

# Kubernetes

# MAIN FUNCTIONALLITY EXAMPLE:
curl -X GET http://10.1.162.247:5556/predict/localhost/k8smaster/5T/memory
curl -X GET http://10.1.162.247:5556/predict/localhost/k8smaster/15T/memory+cpu

#SEE CURRENTLY DEPLOYED PODS INSIDE KUBERNETES CLUSTER
kubectl get pods

#TO GET INFORMATION ABOUT UPLOADED PODS (ALL OF THEM)
kubectl get deployments
#FOR ERROR CHECKING:
kubectl get events
kubectl get pods

kubectl logs <predict POD NAME> -p
#EXAMPLE:
kubectl logs predict-6fd4c69489-bmjhr -p

#FOR IP-PORT etc INFORMATION ABOUT THE SERVICE:
kubectl describe service predict-svc

#TO REUPLOAD DEPLOYED POD RUN THESE TWO:
kubectl create -f predict.yaml
#First time only: kubectl create -f predict-svc.yaml

#TO DELETE DEPLOYED POD RUN THESE TWO:
#ATTENTION IN THAT!
kubectl delete -f predict.yaml
#Only to completely remove: kubectl delete -f predict-svc.yaml

=================================================================================================

samaras@lv140340008913a:~/Code/Tandem/Infrastructure Prediction$ docker run 7eea8f806849 pip list
Package                      Version
---------------------------- --------
absl-py                      1.4.0
aniso8601                    9.0.1
astunparse                   1.6.3
cachetools                   5.3.0
certifi                      2023.5.7
charset-normalizer           3.1.0
click                        8.1.3
Flask                        2.2.5
Flask-Cors                   3.0.10
Flask-RESTful                0.3.10
flatbuffers                  23.5.9
gast                         0.4.0
google-auth                  2.18.1
google-auth-oauthlib         0.4.6
google-pasta                 0.2.0
grpcio                       1.54.2
h5py                         3.8.0
idna                         3.4
importlib-metadata           6.6.0
itsdangerous                 2.1.2
Jinja2                       3.1.2
joblib                       1.2.0
keras                        2.11.0
libclang                     16.0.0
Markdown                     3.4.3
MarkupSafe                   2.1.2
numpy                        1.21.6
oauthlib                     3.2.2
opt-einsum                   3.3.0
packaging                    23.1
pip                          22.0.4
protobuf                     3.19.6
pyasn1                       0.5.0
pyasn1-modules               0.3.0
pytz                         2023.3
requests                     2.30.0
requests-oauthlib            1.3.1
rsa                          4.9
scikit-learn                 1.0.2
scipy                        1.7.3
setuptools                   57.5.0
six                          1.16.0
tensorboard                  2.11.2
tensorboard-data-server      0.6.1
tensorboard-plugin-wit       1.8.1
tensorflow                   2.11.0
tensorflow-estimator         2.11.0
tensorflow-io-gcs-filesystem 0.32.0
termcolor                    2.3.0
threadpoolctl                3.1.0
typing_extensions            4.6.1
urllib3                      1.26.16
Werkzeug                     2.2.3
wheel                        0.37.1
wrapt                        1.15.0
zipp                         3.15.0
