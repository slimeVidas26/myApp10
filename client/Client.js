import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';


const httpLink = createHttpLink({
  uri: 'http://192.168.1.178:4004/', // Replace with your GraphQL server URL
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

