import { ChakraProvider } from '@chakra-ui/react';
import * as ReactDOM from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import 'swiper/css/bundle';
import 'cropperjs/dist/cropper.css';

import '@fontsource-variable/lexend';

import theme from 'theme/theme';

import { QueryClientProvider } from '@tanstack/react-query';
import getQueryClient from 'utils/queryClient';
import App from 'App';

import { Provider } from 'react-redux';
import { store } from 'redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <QueryClientProvider client={getQueryClient}>
    {import.meta.env.MODE !== 'production' ? (
      <ReactQueryDevtools initialIsOpen={true} />
    ) : null}

    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </QueryClientProvider>
);
