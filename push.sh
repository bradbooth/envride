# Login
az login
docker login envrideRegistry.azurecr.io

# Ensure all images are built
docker-compose build --no-cache

docker push envrideRegistry.azurecr.io/nginx:latest
docker push envrideRegistry.azurecr.io/maps:latest
docker push envrideRegistry.azurecr.io/otherapp:latest