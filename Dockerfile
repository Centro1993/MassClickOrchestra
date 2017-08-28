# specify the node base image with your desired version node:<version>
FROM node:latest
# get and launch application

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get install -y --no-install-recommends pdftk && \
    apt-get clean

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY package.json /usr/src/app/
RUN npm install --unsafe-perm  && npm cache clean
RUN mkdir worker
COPY . /usr/src/app

EXPOSE 8084


CMD [ "npm", "start" ]