FROM node:20

RUN mkdir -p /app/node_modules && chown -R node:node /app

USER node

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "yarn", "serve" ]
