import { gql } from '@apollo/client';

export const MUTATIONS = {
  createTodo: gql`
    mutation CreateTodo($title: String!) {
      createTodo(title: $title) {
        id
        title
        isCompleted
      }
    }
  `,
  updateTodo: gql`
    mutation UpdateTodo($id: String!, $isCompleted: Boolean!) {
      updateTodo(id: $id, isCompleted: $isCompleted) {
        id
        title
        isCompleted
      }
    }
  `,
  
  deleteTodo: gql`
    mutation DeleteTodo($id: String!) {
      deleteTodo(id: $id)
    }
  `,
};
