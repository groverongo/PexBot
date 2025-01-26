FROM node:18-alpine3.20

WORKDIR /bot

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN apk update
RUN apk upgrade
RUN apk add --no-cache ffmpeg

COPY . .

RUN yarn install

CMD ["yarn", "start"]