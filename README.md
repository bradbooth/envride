# Envride Project

## About
Azure multi-container webapp service with NGINX gateway & SpringBoot microservices

Requires:
* Apache Maven 3.6.1
* Docker version 18.09.5
* Java version: 1.8

## Backend

Build Spring Boot Service
```
mvn package -f pom.xml
```
Build Docker Image
```
docker build -f Dockerfile -t envride.azurecr.io/<SERVICE NAME>:latest .
```
Push Docker Image
```
# Login to registry
az acr login --name envride 

# Push to registry
docker push envride.azurecr.io/<SERVICE NAME>:latest
```

Run Backend
```
docker-compose up -d
```

Close backend
```
docker-compose down
```