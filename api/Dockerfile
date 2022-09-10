FROM node:16-alpine as build-stage
WORKDIR /api
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .

EXPOSE 8000
CMD [ "node", "server.js" ]