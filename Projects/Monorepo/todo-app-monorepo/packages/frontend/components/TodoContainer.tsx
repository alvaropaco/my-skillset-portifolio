import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { Todo } from '../../shared/generated-types';
import { useApolloClient } from '../hooks/ContextProvider';
import { TODOS_QUERY } from '../graphql/queries';
import { MUTATIONS } from '../graphql/mutations';

type CreateTodoMutationResult = {
  __typename: "Mutation";
  createTodo: Todo;
};

type TodosQueryResult = {
  todos: Todo[];
};

const TodoContainer: React.FC = () => {
  const client = useApolloClient();
  const [data, setData] = useState<{ todos: Todo[] }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();
  const [todoInput, setTodoInput] = useState('');

  useEffect(() => {
    fetchData();
  }, [client]);

  const fetchData = async () => {
    try {
      const result = await client.query({ query: TODOS_QUERY });
      setData(result.data);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (variables: Pick<Todo, "title">) => {
    try {
      const optimisticResponse = {
        __typename: "Mutation",
        createTodo: {
          id: Date.now().toString(),
          title: variables.title,
          isCompleted: false,
          __typename: "Todo",
        },
      };

      const { data } = await client.mutate({
        mutation: MUTATIONS.createTodo,
        variables: variables,
        optimisticResponse,
        update: (cache, mutationResult) => {
          const createTodoResult = mutationResult.data as CreateTodoMutationResult;
          if (createTodoResult && createTodoResult.createTodo) {
            const currentTodos = cache.readQuery<TodosQueryResult>({ query: TODOS_QUERY });
            if (currentTodos) { // Ensure it's not undefined before proceeding.
              cache.writeQuery({
                query: TODOS_QUERY,
                data: {
                  todos: [...currentTodos.todos, createTodoResult.createTodo],
                },
              });
            }
          }
        },
      });
      fetchData();
      return data;
    } catch (error) {
      console.error("Error executing createTodo mutation:", error);
      throw error;
    }
  };

  const handleCreateTodo = async () => {
    try {
      const variables = {
        title: todoInput,
      };
      const result = await createTodo(variables);
      console.log("Mutation result:", result);
      setTodoInput('');
    } catch (error) {
      console.error("Error creating todo:", error);
      // Potentially show a user-friendly error message here.
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={todoInput}
        onChangeText={setTodoInput}
        placeholder="Add a ToDo"
      />
      <Button title="Add ToDo" onPress={handleCreateTodo} />
      <FlatList
        data={data?.todos}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Button title="Complete" />
            <Button title="Delete" />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default TodoContainer;
