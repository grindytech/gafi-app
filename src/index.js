import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'

import './interfaces/augment-api';
import './interfaces/augment-types';
import "./interfaces/types-lookup";

import App from './App'
import { ChakraProvider } from '@chakra-ui/react';
import { UseWalletProvider } from 'use-wallet';
import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from "./theme";
import { BrowserRouter as Router } from "react-router-dom";
import './i18n';

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
        <Router>
          <Suspense fallback={"..."}>
          <App />
        </Suspense>
        </Router>
      </ChakraProvider>
    </UseWalletProvider>
  </QueryClientProvider>,
  document.getElementById('root')
)
