FROM openjdk:8-jre-alpine

WORKDIR /home

# ENV mongoURL "Monitoring"

COPY ./target/*.jar ./service_catalogue-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "/home/service_catalogue-0.0.1-SNAPSHOT.jar"]

EXPOSE 8080

# CMD java $JAVA_HTTP_PROXY $JAVA_HTTPS_PROXY $JAVA_NON_PROXY_HOSTS -DSPRING_BOOT_WAIT_FOR_SERVICES=symbiote-aam:8080 -jar $(ls *run.jar)