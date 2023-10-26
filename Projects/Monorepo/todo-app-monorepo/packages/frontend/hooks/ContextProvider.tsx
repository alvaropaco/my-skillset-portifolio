import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React, { useContext, createContext } from 'react';

// Create a context for the Apollo client
const ApolloContext = createContext<ApolloClient<any> | undefined>(undefined);

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
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
