import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
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
  }, [client, data]);

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

      const { data: result } = await client.mutate({
        mutation: MUTATIONS.createTodo,
        variables: variables,
        optimisticResponse,
        update: (cache, mutationResult) => {
          const createTodoResult = mutationResult.data as CreateTodoMutationResult;
          if (createTodoResult && createTodoResult.createTodo) {
            const currentTodos = cache.readQuery<TodosQueryResult>({ query: TODOS_QUERY });
            if (currentTodos) {
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
      return result;
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
      setTodoInput('');
      return result
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const updateTodo = async (variables: Pick<Todo, "id" | "isCompleted">) => {
    try {
      const { data: result } = await client.mutate({
        mutation: MUTATIONS.updateTodo,
        variables: variables,
        refetchQueries: [{ query: TODOS_QUERY }], // Refetch todos after mutation
      });
      const newTodos = data?.todos.map((todo: Todo) => {
        const copy = { ...todo }
        if(todo.id == variables.id) {
          copy.isCompleted = result.updateTodo.isCompleted
        }
        return copy
      }) ?? []
      setData({ todos: [...newTodos]})
      return result;
    } catch (error) {
      console.error("Error executing updateTodo mutation:", error);
      throw error;
    }
  };  

  const handleUpdateTodo = async (id: string, isCompleted: boolean) => {
    try {
      const variables = {
        id,
        isCompleted,
      };
      await updateTodo(variables);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };  

  const deleteTodo = async (variables: Pick<Todo, "id">) => {
    try {
      const { data: result } = await client.mutate({
        mutation: MUTATIONS.deleteTodo,
        variables: variables,
        update: (cache) => {
          const currentTodos = cache.readQuery<TodosQueryResult>({ query: TODOS_QUERY });
          if (currentTodos) {
            const newTodos = currentTodos.todos.filter(todo => todo.id !== variables.id);
            cache.writeQuery({
              query: TODOS_QUERY,
              data: {
                todos: newTodos,
              },
            });
          }
        },
      });
      const newTodos = data?.todos.filter((todo: Todo) => todo.id != variables.id) ?? []
      setData({ todos: [...newTodos]})
      return result;
    } catch (error) {
      console.error("Error executing deleteTodo mutation:", error);
      throw error;
    }
  };
  
  const handleDeleteTodo = async (id: string) => {
    try {
      const variables = {
        id,
      };
      await deleteTodo(variables);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };  

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={todoInput}
          onChangeText={setTodoInput}
          placeholder="Add a task here..."
        />
        <TouchableOpacity style={styles.addButton} onPress={handleCreateTodo}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data?.todos}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={item.isCompleted ? styles.todoTextCompleted : styles.todoText}>{item.title}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.completeButton} onPress={() => handleUpdateTodo(item.id, !item.isCompleted)}>
                <Text>{item.isCompleted ? "✓" : "✓"}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteTodo(item.id)}>
                <Text>×</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "80%",
    marginLeft: 0.1,
    marginRight: 0.1,
    padding: 20,
    backgroundColor: '#E6F7FF',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  addButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#4A90E2',
  },
  addButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  todoText: {
    flex: 1,
  },
  todoTextCompleted: {
    flex: 1,
    textDecorationLine: 'line-through',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  completeButton: {
    marginRight: 10,
  },
  deleteButton: {},
});

export default TodoContainer;
