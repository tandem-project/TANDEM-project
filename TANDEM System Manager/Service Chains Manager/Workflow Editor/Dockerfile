FROM python:3.7

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN mkdir -p /var/run/secrets/kubeflow/pipelines
RUN echo 'hash_key' > /var/run/secrets/kubeflow/pipelines/token

RUN pip3 install requests
RUN pip3 install kfp==1.8.21
RUN pip3 install Flask

COPY . /usr/src/app

EXPOSE 5000

ENTRYPOINT ["python3"]

CMD ["-m", "flask", "--app", "src", "run", "--host=0.0.0.0"]
