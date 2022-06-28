import { ChakraProvider } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Fonts, theme } from 'themes/theme';

import 'translations/i18n';
import { QueryParamProvider } from 'use-query-params';
import { UseWalletProvider } from 'use-wallet';

import App from './App';
import './interfaces/augment-api';
import './interfaces/augment-types';
import './interfaces/types-lookup';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

ReactDOM.render(
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
        <Fonts />
        <Router>
          <Suspense fallback="...">
            <QueryParamProvider ReactRouterRoute={Route}>
              <App />
            </QueryParamProvider>
          </Suspense>
        </Router>
      </ChakraProvider>
    </UseWalletProvider>
  </QueryClientProvider>,
  document.getElementById('root')
);
