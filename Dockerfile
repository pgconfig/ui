FROM node:14

WORKDIR /build

COPY package.json .
COPY yarn.lock .

RUN yarn install

