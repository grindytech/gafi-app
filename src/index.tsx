import { ChakraProvider } from '@chakra-ui/react';
import * as ReactDOM from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import '@fontsource-variable/lexend';

import theme from 'theme/theme';

import { QueryClientProvider } from '@tanstack/react-query';
import getQueryClient from 'utils/utils.queryClient';
import App from 'App';

import { AccountContextProvider } from 'contexts/contexts.account';
import { SubstrateContextProvider } from 'contexts/contexts.substrate';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <QueryClientProvider client={getQueryClient}>
    {import.meta.env.MODE !== 'production' ? (
      <ReactQueryDevtools initialIsOpen={true} />
    ) : null}

    <ChakraProvider theme={theme}>
      <AccountContextProvider>
        <SubstrateContextProvider>
          <App />
        </SubstrateContextProvider>
      </AccountContextProvider>
    </ChakraProvider>
  </QueryClientProvider>
);
