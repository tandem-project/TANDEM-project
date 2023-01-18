docker build . -f marketplace/Dockerfile -t marketplace

#docker run -p 127.0.0.1:5000:5000/tcp --network microservices -e RECOMMENDATIONS_HOST=recommendations marketplace
#docker run --network microservices -e RECOMMENDATIONS_HOST=recommendations marketplace
docker run -p 5000:5000 --network microservices -e RECOMMENDATIONS_HOST=recommendations marketplace
