import { GraphQLClient } from 'graphql-request';

// Temporary using localhost. Should use env var.
const endpoint = 'http://localhost:3000';

const client = new GraphQLClient(endpoint, { headers: {} });
export default client;
