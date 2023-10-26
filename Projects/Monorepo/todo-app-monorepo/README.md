# Alvaro's TODO App
## Lerna Monorepo Project

This project is structured as a Lerna monorepository with packages for frontend, backend, and shared modules.

## Project Structure

```
lerna-monorepo/
│
└───packages/
    │
    ├───backend/
    │
    ├───frontend/
    │
    └───shared/
```

## Setup and Installation

Follow the steps below to set up and start the project:

### 1. Install Dependencies

At the project root, run the following command:

```bash
npm install
```

### 2. Setup Frontend

Update the `packages/frontend/environment.js` file with the appropriate settings for your environment. You should adjust the API url according with your local network.

### 3. Setup Docker Infrastructure

To start the required Docker infrastructure, such as Postgres, run:

```bash
docker-compose up -d
```

This command you up the necessary Postgres db and PgAdmin GUID.

### 4. Setup Backend

Update the `packages/backend/.env` file with the correct credentials for connection and any other necessary configurations.

## Running the Project

After setup, you can run the packages individually as needed, like:

`npm run start -w backend` or `npm run start -w frontend`

Or 

run all the packages at once with

`npm run start`

## What's next?

What should be implemented next in this project in order to accomplish the chanllenge?

- Tests: unit, intregation and E2E test makes part of a good quality code, but due lack of time the tests implementations was not prioritized in this assessment work;
- CI/CD: We aims to implement a robust infrastruture as a code and well implmented CI/CD process. But also, due my personal life moment I had not enouth time to accomplish that.

## Any futher questions or comments?

Getting touch with me through my social:

- [Linkedin](https://www.linkedin.com/in/alvaropaco/)
- [Medium](https://alvaropaconeto.medium.com/)
- [alvaropaconeto@gmail.com](mailto:alvaropaconeto@gmail.com)