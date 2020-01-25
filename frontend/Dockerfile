
FROM node:latest as build-stage


WORKDIR /app
COPY ./package*.json ./

ARG GOOGLE_MAPS_API_KEY_FRONTEND
ENV GOOGLE_MAPS_API_KEY_FRONTEND $GOOGLE_MAPS_API_KEY_FRONTEND

RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage

RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx/conf.d/ /etc/nginx/conf.d/