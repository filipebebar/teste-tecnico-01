FROM node:18-alpine

WORKDIR /home/teste-tecnico-rededor

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3000

CMD yarn start:dev



