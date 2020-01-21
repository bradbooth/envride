# Envride Project

## About
Azure multi-container webapp service with NGINX gateway & SpringBoot microservices

Requires:
* Docker version 18.09.5
* Docker-compose version 1.24.1
* Java version: 1.8

## Setup

### Creating .env file
In order to store api keys, they must be placed in a `.env` file in the project root directory like so:

```
# .env file
GOOGLE_MAPS_API_KEY_FRONTEND=YOUR_API_KEY_GOES_HERE
GOOGLE_MAPS_API_KEY_BACKEND=YOUR_API_KEY_GOES_HERE
```
For development purposes, both frontend and backend google maps api keys can be the same

## Running the project
From the project root directory: <br />

To create the neccessary docker images run:
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
To push to azure registry for production
<br>
Ensure correct .env file is used
```
# Login to registry
az acr login --name envride 

# Push to registry
docker push envride.azurecr.io/<SERVICE NAME>:latest
```