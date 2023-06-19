import { ChakraProvider } from '@chakra-ui/react';
import * as ReactDOM from 'react-dom/client';

import App from './App';

import '@fontsource-variable/lexend';

import theme from 'theme/theme';

import { UseWalletProvider } from 'use-wallet';
import { QueryClientProvider } from '@tanstack/react-query';
import getQueryClient from 'utils/queryClient';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <QueryClientProvider client={getQueryClient}>
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
        <App />
      </ChakraProvider>
    </UseWalletProvider>
  </QueryClientProvider>
);
