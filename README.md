<p align="center">
    <a href="https://houseav.life/" target="blank"><img src="https://github.com/user-attachments/assets/068b5610-7db1-4489-90b6-cdb117b72b27" width="200" alt="Loud Logo" /></a>
</p>


<h1 align="center">houseav.backend</h1>
<p align="center">Houseav backend system platform</p>

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=for-the-badge" alt="JavaScript Badge">
    <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJs">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge" alt="TypeScript Badge">
    <img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=fff&style=for-the-badge" alt="PostgreSQL Badge">
</p>


## Description
Backend of houseav


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## PostgresSQL 
For semplicity i'm gonna use the Europe TimeZone
```
SET TIMEZONE TO 'Europe/Berlin';
```

## Test ci locally
```
Installation
(MacOS)
$ brew install act

Run ci workflow
$ act push --env .act.env --secret-file .act.env  

**you can also spcify container architecture
$ act push --env .act.env --secret-file .act.env --container-architecture linux/arm64  

or using:
$ npm run local:ci
```

## Stay in touch

- Author - Luca Imbalzano

## License

Nest is [MIT licensed](LICENSE).
