
FROM node:latest as build-stage


WORKDIR /app
COPY ./package*.json ./

ARG GOOGLE_MAPS_API_KEY
ENV REACT_APP_GOOGLE_MAPS_API_KEY $GOOGLE_MAPS_API_KEY

RUN npm install
COPY ./ .
RUN npm run-script build

FROM nginx as production-stage

RUN mkdir /app
COPY --from=build-stage /app/build /app
COPY nginx/conf.d/ /etc/nginx/conf.d/