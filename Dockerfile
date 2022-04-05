FROM node:16.13.2-alpine3.14

RUN npm install -g @nestjs/cli

USER node

WORKDIR /home/node/api