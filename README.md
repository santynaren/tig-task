# ShrinkLink - URL Shortener Project

The following task is being completed by Narendra as part of TIG Company Interview for the Role of Senior Software Engineer

## Tech Stack

| Tech            | Tech Stack Used |
| :-------------- | :-------------- |
| Server          | NodeJs, NestJs  |
| ORM             | Prisma          |
| Database        | Postgres        |
| API Layer       | GraphQL         |
| Langugae        | TypeScript      |
| Package Manager | yarn            |
| Tests           | Jest            |

## Documentation

Complete Informaiton on the steps taken to aid the following implementation could be found here : [System Design](https://docs.google.com/document/d/1eGzX1aHYAVP14ASylG08X1v-KlqbiqmQAKlVdzSabv0/edit?usp=sharing)

## Features

- Supports more than 255 chatacters URL
- Shortend URL to 5 chatacter string, ease to use
- Check views with viewcount params

### Prerequisites

- postgres.app (https://postgresapp.com/)
- docker (not mandatory)
- verify postgres or docker being running before testing the project

### Installation

- Initally clone the repository and run `yarn install`
- Create a new `.env` file with the contents in `.env.example` and update the placeholders with your system

#### Local

- Migrate Prisma DB with following command

```bash
   yarn prisma migrate dev --name init
```

- Run Prisma Studio to check the connection is working and you are able to see the schema as mentioned in `prisma/schema.prisma`

```bash
   yarn prisma studio
```

- Run the server with the following command

```bash
   yarn start:dev
```

- You can find the service running on `http://localhost:3000/api/graphql`
- Creating Short URLs : `http://localhost:3000/api/graphql`
- Testing Short URLs Redirection : `http://localhost:3000/:shortURL`

#### Docker

- Verify `docker-compose.yml`
- Start docker container

```bash
   docker compose up -d
```

- Migrate Prisma DB with following command

```bash
   yarn prisma migrate dev --name init
```

- Validate the schema with the following commands

```bash
   docker exec -it [your-container-name] psql -U [your-user-name] [your-postgres-name]
```

- then type the following to check the connection is working and you are able to see the schema as mentioned in `prisma/schema.prisma`

```bash
   \dt
```

- Run the server with the following command

```bash
   yarn start:dev
```

- You can find the service running on `http://localhost:3000/api/graphql`
- Creating Short URLs : `http://localhost:3000/api/graphql`
- Testing Short URLs Redirection : `http://localhost:3000/:shortURL`

## API Reference

### GET Http

| Parameter | Query       | Description                                               |
| :-------- | :---------- | :-------------------------------------------------------- |
| `/`       | `:shortURL` | call the shortURL here, you will find the page redirected |

### GET Graphql-Queries `/api/graphql`

| Query            | Args       | Description                         |
| :--------------- | :--------- | :---------------------------------- |
| `getShrinklinks` |            | Returns all the shrinkLinks from DB |
| `getSourceLink`  | `shortURL` | Returns the sourceURL               |

### POST Graphql-Mutations `/api/graphql`

| Mutation           | Args        | Description                        |
| :----------------- | :---------- | :--------------------------------- |
| `createShrinkLink` | `sourceURL` | Returns an object with Shrinklinks |

## Running Tests

### Unit Test

Run the following command

```bash
  yarn test
```

### End to End Test

Make a copy envionrment of `.env` by name `.env.test` (for this you can use the `.env.example` as reference) also make sure you have the connection properly adhered to the stack

```bash
  yarn test:e2e
```

## Issues

For Issues or queries, email santhoshnarendra@gmail.com
