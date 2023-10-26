import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TodoContainer from './components/TodoContainer';
import { ApolloClientProvider } from './hooks/ContextProvider';

export default function App() {
  return (
    <ApolloClientProvider>
      <View style={styles.container}>
        <Text style={styles.apptTitle}>Alvaro's TODO list</Text>
        <TodoContainer />
        <StatusBar style="auto" />
      </View>
    </ApolloClientProvider>
  );
}

const styles = StyleSheet.create({
  apptTitle: {
    marginBottom: 40,
    marginTop: 40,
    fontFamily: "Roboto",
    fontSize: 32,
    color: "gray"
  },
  container: {
    display: "flex",
    width: "100%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
