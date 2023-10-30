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

## QA & Compatibilities

Quality and performance tests was done in the following devices:

| Platform/Device         | Version                                 | Tested           |
|-------------------------|-----------------------------------------|------------------|
| Chrome Browser          | Version 116.0.5845.110 (Official Build) (arm64) | ✅             |
| Android Device          | Version 13                              | ✅             |
| Android Emulator        | Genymotion Google Pixel 3               | ✅             |
| iOS                     | -                                       | ❌             |

The "✅" mark indicates that the TODO app software was tested on that platform or device. The "❌" mark indicates it was not tested on iOS.

## Demo

### Web version
[screen-capture (1).webm](https://github.com/alvaropaco/my-skillset-portifolio/assets/3423410/92cc78c2-760b-4930-acc6-e9c0ce8b6a73)

### Mobile version
[screen-capture-Android.mp4](https://github.com/alvaropaco/my-skillset-portifolio/assets/3423410/5c11ab38-fb75-43fb-871e-4eccd604d05c)

## What's next?

What should be implemented next in this project in order to accomplish the chanllenge?

- Tests: unit, intregation and E2E test makes part of a good quality code, but due lack of time the tests implementations was not prioritized in this assessment work;
- CI/CD: We aims to implement a robust infrastruture as a code and well implmented CI/CD process. But also, due my personal life moment I had not enouth time to accomplish that.

## Any futher questions or comments?

Getting touch with me through my social:

- [Linkedin](https://www.linkedin.com/in/alvaropaco/)
- [Medium](https://alvaropaconeto.medium.com/)
- [alvaropaconeto@gmail.com](mailto:alvaropaconeto@gmail.com)
