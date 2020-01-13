# Envride Project

## About
Azure multi-container webapp service with NGINX gateway & SpringBoot microservices

Requires:
* Docker version 18.09.5
* Docker-compose version 1.24.1
* Apache Maven 3.6.1
* Java version: 1.8

## Setup
From the project root directory: <br />
To create the neccessary docker images:
```
sh build.sh
```
Then run the containers:
```
docker-compose up
```
Finally, visit `localhost` in a browser.

To stop the containers:
```
docker-compose down
```

## Azure
Push Docker Image
```
# Login to registry
az acr login --name envride 

# Push to registry
docker push envride.azurecr.io/<SERVICE NAME>:latest
```