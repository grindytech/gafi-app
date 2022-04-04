import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { ChakraProvider } from '@chakra-ui/react';
import { UseWalletProvider } from 'use-wallet';
import { QueryClient, QueryClientProvider } from 'react-query';

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
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </UseWalletProvider>
  </QueryClientProvider>,
  document.getElementById('root')
)
