The directories of Grafana, Eclipse-Mqtt, InfluxDB and Temperature & Humidity App contains all the deployment, services and volume files that are mandatory for the installation of an Iot Data Analytics PaaS Service. If we want to deploy manually the IoT Data and Analytics Workflow (without pi-edge) we have to execute :

kubectl apply -f Eclipse-Mqtt/*

kubectl apply -f InfluxDB/*

kubectl apply -f Temperature & Humidity App/messenger-deployment.yaml

kubectl apply -f Grafana/*


The EdgeX PaaS Service have to already been deployed to the TANDEM node before the execution of the above commands.


If the IoT Data and Analytics PaaS Service is successfully deployed, it is mandatory to configure the existing PaaS Services (EdgeX) in order to communicate with the Services of the IoT Data and Analytics PaaS. For this reason, the user have to run the commands step-by-step as described in the 'IoT Workflow Configuration of Edgex PaaS Services.docx'.
