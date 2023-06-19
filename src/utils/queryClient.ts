import { QueryClient } from '@tanstack/query-core';

const getQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default getQueryClient;
