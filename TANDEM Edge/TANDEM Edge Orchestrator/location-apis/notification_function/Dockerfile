FROM python:3.6-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN pip3 install --upgrade pip

RUN pip3 install requests
RUN pip3 install pymongo


COPY . /usr/src/app

ENTRYPOINT ["python3"]

CMD ["notify_users.py"]