
The app.py file contains the functionality for the temperature and humidity app in order to retrieve metrics from the mqtt "bus" and store them in the influxdb.

After any change or update to the app.py file, we have to rebuilt the docker image as:

docker build -t image_name -f Dockerfile

docker push to a public/private repo (in our case docker push -t alexvalas/k8s-messenger-iot-final:v0.3)

The messenger-deployment.yaml is the deployment description file of the temperature and humidity app for a kubernetes deployment.
