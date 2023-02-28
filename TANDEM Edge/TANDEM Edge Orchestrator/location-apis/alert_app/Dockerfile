FROM python:3.6-alpine
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY . /usr/src/app
RUN pip3 install --upgrade pip
RUN pip3 install influxdb==5.2.2
RUN pip3 install python-dateutil==2.8.0
RUN pip3 install paho-mqtt==1.4.0
CMD ["python", "app.py"]