# Todo List App Assessment

A modern Todo List App built with React Native and Apollo GraphQL, and structured in a monorepo.

## Getting Started

These instructions will get the frontend of the Todo List app up and running on your local machine for development purposes.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/): Install using `npm install -g expo-cli`

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:alvaropaco/my-skillset-portifolio.git
   ```

2. Navigate to the frontend directory:
   ```bash
   cd Projects/Monorepo/todo-app-monorepo/frontend
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   expo start
   ```

This will start the app in development mode. Open it in the [Expo Go app](https://expo.dev/client) on your device to see it in action.

## Tech Stack and Frontend Architecture

### Technologies Used:

- **React Native**: A framework for building native apps using React.
- **Expo**: A framework and a platform for universal React applications. It's a set of tools built around React Native and native platforms that help you develop, build, deploy, and quickly iterate on iOS, Android, and web apps.
- **Apollo GraphQL**: For fetching and mutating data, also providing a cache layer to reduce the number of requests and provide a smoother user experience.
- **React Hook Form & Yup**: For building and validating forms.
- **Luxon**: For date-related functionalities.
- **ESLint & Prettier**: For code linting and formatting.

### Frontend Architecture:

1. **Components**: Atomic and reusable UI pieces.
2. **Screens**: Each screen corresponds to a full view that a user might navigate to.
3. **Navigation**: Using `@react-navigation/native` for managing the app's navigation.
4. **State Management**: Apollo Client's cache is used for most of the app's local state management needs. Reactive Variables from Apollo are also used for more dynamic parts of the state.
5. **Utilities**: Helper functions and utilities are kept here, including date functions using Luxon.
6. **GraphQL**: Contains GraphQL queries, mutations, and fragments. Integrated with Apollo Client.
7. **Validation**: Form validations are set up using Yup schemas and integrated with React Hook Form for a seamless experience.

## Contribution

Feel free to fork the project and submit pull requests. Ensure that your code passes linting checks and is formatted according to Prettier standards.

## License

This project is open-sourced under the MIT License. See the LICENSE file for more information.
