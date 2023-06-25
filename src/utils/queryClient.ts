import { QueryClient } from '@tanstack/react-query';

const timeQuery = 5 * 60 * 1000; // 1 * 60 * 1000 = 1 minute

const getQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: timeQuery,
      staleTime: timeQuery,
    },
  },
});

export default getQueryClient;
