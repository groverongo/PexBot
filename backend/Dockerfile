FROM node:18-alpine3.20

WORKDIR /bot

COPY package.json package.json
COPY yarn.lock yarn.lock

COPY . .

RUN yarn install

CMD ["yarn", "start"]