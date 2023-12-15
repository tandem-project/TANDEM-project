FROM ultralytics/ultralytics:8.0.189-cpu

RUN apt update

# SET TIMEZONE
ENV TZ=Europe/Athens
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
# SET NON INTERACTIVE TERMINAL COMMANDS DURING BUILD
ENV DEBIAN_FRONTEND noninteractive

# INSTALL APT PACKAGES
RUN apt install -y python3-pip
RUN pip install --upgrade pip wheel gunicorn nano

# INSTALL PYTHON DEPENDENCIES
RUN pip install numpy opencv-python
# RUN apt install --reinstall ca-certificates

RUN pip install flask
RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y

# RUN cp /usr/bin/python3 /usr/bin/python

COPY ./app /app
COPY ./entrypoint.sh /entrypoint.sh 
RUN chmod +x /entrypoint.sh

WORKDIR /

ENTRYPOINT ["bash", "-c","/entrypoint.sh"]
