# ToDo App

This backend project provides a GraphQL API for managing to-do items. It's built with [NestJS](https://nestjs.com/), TypeORM for database interactions, and utilizes Docker for environment setup.

## Table of Contents

- [Setup](#setup)
  - [Dependencies](#dependencies)
  - [Environment with Docker](#environment-with-docker)
- [Running the project](#running-the-project)
- [Using GraphQL Playground](#using-graphql-playground)
- [API](#api)
  - [Queries](#queries)
  - [Mutations](#mutations)
- [License](#license)

## Setup

### Dependencies

1. Ensure you have [Node.js](https://nodejs.org/) and npm installed.

2. Install project dependencies:
   ```bash
   npm install
   ```

### Environment with Docker

1. Ensure you have Docker and docker-compose installed on your machine.

2. Start the PostgreSQL and pgAdmin services using docker-compose:

   ```bash
   docker-compose up -d
   ```

This command will boot up a PostgreSQL instance and a pgAdmin web interface to interact with it.

## Running the project

Once the environment is set up and dependencies are installed, you can run the project:

```bash
npm run start
```

The GraphQL API should now be accessible at `http://localhost:3000/graphql`.

## Using GraphQL Playground

When the server is running, you can access the GraphQL Playground at `http://localhost:3000/graphql`. This interactive tool lets you test your queries and mutations in real-time.

## API

### Queries

- **getAllTodos**: Fetches all to-do items.
  ```graphql
  {
    getAllTodos {
      id
      title
      isCompleted
    }
  }
  ```

### Mutations

- **createTodo**: Adds a new to-do item.
  ```graphql
  mutation {
    createTodo(input: {
      title: "Sample ToDo",
    }) {
      id
      title
      isCompleted
    }
  }
  ```

- **updateTodo**: Updates an existing to-do item.
  ```graphql
  mutation {
    updateTodo(id: 1, input: {
      title: "Updated ToDo",
      isCompleted: true
    }) {
      id
      title
      isCompleted
    }
  }
  ```

- **deleteTodo**: Deletes a to-do item by ID.
  ```graphql
  mutation {
    deleteTodo(id: 1)
  }
  ```

> Note: Replace placeholders (like `1` in the above examples) with appropriate values as per your needs.

