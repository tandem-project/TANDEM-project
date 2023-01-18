docker network create microservices

docker build . -f recommendations/Dockerfile -t recommendations

docker run -p 50051:50051/tcp --network microservices --name recommendations recommendations
#docker run --network microservices --name recommendations recommendations
