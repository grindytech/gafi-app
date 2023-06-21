import { ChakraProvider } from '@chakra-ui/react';
import * as ReactDOM from 'react-dom/client';

import App from './App';

import '@fontsource-variable/lexend';

import theme from 'theme/theme';

import { QueryClientProvider } from '@tanstack/react-query';
import getQueryClient from 'utils/queryClient';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <QueryClientProvider client={getQueryClient}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </QueryClientProvider>
);
