# Build stage
FROM python:3.7-slim-buster AS build
WORKDIR /todo

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

ENV PATH="/root/miniconda3/bin:${PATH}"
ARG PATH="/root/miniconda3/bin:${PATH}"
RUN apt-get update

RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*

RUN wget \
https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh \
&& mkdir /root/.conda \
&& bash Miniconda3-latest-Linux-x86_64.sh -b \
&& rm -f Miniconda3-latest-Linux-x86_64.sh 
RUN conda --version
RUN apt-get --purge autoremove -y wget

RUN python -m pip install --no-cache-dir --no-deps tensorflow-cpu==2.12.0

# Runtime stage
FROM python:3.7-slim-buster
WORKDIR /todo

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

COPY --from=build /root/miniconda3 /root/miniconda3
COPY requirements.txt requirements.txt
COPY get_predict_m_data.py get_predict_m_data.py

ENV PATH="/root/miniconda3/bin:${PATH}"
ENV PATH="/usr/local/lib/:${PATH}"

RUN pip3 install --no-cache-dir -r requirements.txt
RUN rm requirements.txt

ENV PORT 5556
EXPOSE 5556

#RUN apt-get clean
#RUN apt-get autoclean
#RUN apt-get autoremove
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY data data

ENV HTTP_PROXY=http://icache.intracomtel.com:80
ENV HTTPS_PROXY=http://icache.intracomtel.com:80
ENV FTP_PROXY=http://icache.intracomtel.com:80
ENV NO_PROXY="localhost,::1,.intranet.gr,.intracomtel.com"

CMD ["python", "-u", "get_predict_m_data.py"]

