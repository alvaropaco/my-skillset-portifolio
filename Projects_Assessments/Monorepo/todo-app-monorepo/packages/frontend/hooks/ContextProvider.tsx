import React, { useContext, createContext } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Constants from 'expo-constants';
import getEnvVars from '../environment';

const ENV = getEnvVars(Constants.expoConfig?.hostUri);
console.log(ENV.API_URL)

// Create a context for the Apollo client
const ApolloContext = createContext<ApolloClient<any> | undefined>(undefined);

// Initialize Apollo Client
const client = new ApolloClient({
  uri: `${ENV.API_URL}/graphql`,
  cache: new InMemoryCache(),
});

type ApolloClientProviderProps = {
  children: React.ReactNode;
};

export const ApolloClientProvider: React.FC<ApolloClientProviderProps> = ({ children }: ApolloClientProviderProps) => {
  return (
    <ApolloContext.Provider value={client}>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </ApolloContext.Provider>
  );
};

export const useApolloClient = () => {
  const context = useContext(ApolloContext);
  if (context === undefined) {
    throw new Error('useApolloClient must be used within an ApolloClientProvider');
  }
  return context;
};
