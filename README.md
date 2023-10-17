## Description

Aplicação implementada e voltada para o desafio técnico realizado pela Objective

A aplicação foi pensada para rodar em docker, no qual a aplicação api e banco estão dentro do mesmo container e já em comunicação.
Houve problemas adicionar o comando yarn populate dentro do dockerfile, o mesmo não estava identificando o arquivo populateMongoDb.ts.

Os passos para rodar a aplicação estão abaixo.

## Atenção
Caso esteja utilizando uma maquina windows ao baixar o repository, antes de subir o docker deve-se alterar
a chamada do banco de dados caminho : src/app.module.ts e 
alterar de : mongodb://http://127.0.0.1:27017/local para mongodb://host.docker.internal:27017/local

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ docker compose up -d
```
Acesse a aplicação: [Link de acesso após subir docker](http://127.0.0.1:3000)

Caso tenha problemas para rodar a aplicação no docker e a o banco mongoDB subir, siga:

```bash
# Caso seja necessário, acessar o docker da aplicação e dentro da pasta raiz rodar o comando a seguir:
$ docker exec -it teste-tecnico-rededor sh

# populate database
$ yarn populate

# development
$ yarn start:dev
```
E acesse normalmente a aplicação: [Link de acesso após subir docker](http://127.0.0.1:3000)

## Test

```bash
# unit tests
$ yarn run test

# test coverage
$ yarn run test:cov
```
