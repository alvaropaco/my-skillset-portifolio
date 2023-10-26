import { gql } from '@apollo/client';

export const TODOS_QUERY = gql`
  query GetTodos {
    todos {
      id
      title
      isCompleted
    }
  }
`;
