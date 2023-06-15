import { ChakraProvider } from '@chakra-ui/react';
import * as ReactDOM from 'react-dom/client';

import App from './App';

import '@fontsource-variable/lexend';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route } from 'react-router-dom';
import theme from 'theme/theme';
import { QueryParamProvider } from 'use-query-params';
import { UseWalletProvider } from 'use-wallet';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
root.render(
  <QueryClientProvider client={queryClient}>
    <UseWalletProvider
      connectors={{
        walletconnect: {
          rpc: {
            56: 'https://bsc-dataseed.binance.org/',
            97: 'http://rpc-testnet.hne.to/',
          },
        },
      }}
      autoConnect
    >
      <ChakraProvider theme={theme}>
        <Suspense fallback="...">
          <App />
        </Suspense>
      </ChakraProvider>
    </UseWalletProvider>
  </QueryClientProvider>
);
