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
    mutation UpdateTodo($id: Int!, $title: String!, $isCompleted: Boolean!) {
      updateTodo(input: { id: $id, title: $title, isCompleted: $isCompleted }) {
        id
        title
        isCompleted
      }
    }
  `,
  
  deleteTodo: gql`
    mutation DeleteTodo($id: Int!) {
      deleteTodo(id: $id) {
        id
      }
    }
  `,
};
