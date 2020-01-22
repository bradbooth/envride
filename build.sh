
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

# Ensure .env file exists
FILE=.env
if ! [ -f "$FILE" ]; then
    echo "\e[31mWARNING: $FILE file not found in root directory\e[0m"
    echo "External API's won't work"
    echo "Refer to README for instructions on creating .env file"
fi

docker-compose down
docker-compose build

echo "\nDone:\nRun 'docker-compose up' and visit localhost in a browser to begin.\n"