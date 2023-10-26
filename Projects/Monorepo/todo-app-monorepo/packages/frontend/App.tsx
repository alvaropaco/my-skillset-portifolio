import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TodoContainer from './components/TodoContainer';
import { ApolloClientProvider } from './hooks/ContextProvider';

export default function App() {
  return (
    <ApolloClientProvider>
      <View style={styles.container}>
        <Text>My ToDo App</Text>
        <TodoContainer />
        <StatusBar style="auto" />
      </View>
    </ApolloClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
