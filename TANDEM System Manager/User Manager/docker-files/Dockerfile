###############################################################################
# Copyright 2016-2017 Dell Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
###############################################################################
# Docker image for Core Data micro service 
# FROM java:8
#FROM maven:3.3-jdk-8-alpine

#COPY docker-files/pom.xml .

#RUN mvn dependency:copy -q

#FROM alpine:3.6
#MAINTAINER Jim White <james_white2@dell.com>

#RUN apk --update add openjdk8-jre

# environment variables
#ENV APP_DIR=/edgex/edgex-core-data
#ENV APP=core-data.jar
#ENV APP_PORT=48080

#copy JAR and property files to the image
#COPY --from=0 *.jar $APP_DIR/$APP
#COPY docker-files/*.properties $APP_DIR/

#expose core data port
#EXPOSE $APP_PORT

#set the working directory
#WORKDIR $APP_DIR

#kick off the micro service
#ENTRYPOINT java -jar -Djava.security.egd=file:/dev/urandom -Xmx150M $APP
FROM openjdk:8-jdk-alpine
COPY user_catalogue-0.0.1-SNAPSHOT.jar /opt/spring-cloud/lib/
ENTRYPOINT ["/usr/bin/java"]
#CMD ["-jar", "-XX:MaxMetaspaceSize=128m", "/opt/spring-cloud/lib/user_catalogue-0.0.1-SNAPSHOT.jar"]
CMD ["-Djava.security.egd=file:/dev/urandom", "-jar", "/opt/spring-cloud/lib/user_catalogue-0.0.1-SNAPSHOT.jar"]
