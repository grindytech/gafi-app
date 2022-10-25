import { GraphQLClient } from 'graphql-request';

import config from 'config';

const endpoint = config.GRAPHQL_ENDPOINT || 'http://localhost:3000';

const client = new GraphQLClient(endpoint, {
  mode: 'cors',
});
export default client;
