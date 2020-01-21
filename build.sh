
###########################################################
#               Builds all docker images                  #
###########################################################

# Ensure appropriate services are installed
if ! [ -x "$(command -v docker)" ]; then
  echo 'Error: docker is not installed.' >&2
  exit 1
fi
if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed.' >&2
  exit 1
fi
if ! [ -x "$(command -v mvn)" ]; then
  echo 'Error: Maven is not installed.' >&2
  exit 1
fi


# map-service
cd map-service/
mvn package -f pom.xml
docker build -f Dockerfile -t envrideRegistry.azurecr.io/map-service:latest .
cd ..

# otherapp-service
cd otherapp-service/
mvn package -f pom.xml
docker build -f Dockerfile -t envrideRegistry.azurecr.io/otherapp:latest .
cd ..

# Front-end
cd frontend/
docker build -f Dockerfile -t envrideRegistry.azurecr.io/nginx:latest .
cd ..


echo "\nSuccess:\nRun 'docker-compose up' and visit localhost in a browser to begin.\n"