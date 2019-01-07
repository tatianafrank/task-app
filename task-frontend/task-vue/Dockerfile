# build stage
FROM node:9.11.1-alpine as build-stage

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install && npm run build

# production stage
FROM nginx:1.13.12-alpine as production-stage
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]