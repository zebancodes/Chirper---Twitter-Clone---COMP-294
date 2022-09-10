FROM node:16-alpine as build-stage
WORKDIR /web
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn run build

FROM nginx as production-stage
WORKDIR /app
COPY --from=build-stage /web/build .
COPY nginx.conf /etc/nginx/nginx.conf
