import { ChakraProvider } from '@chakra-ui/react';
import * as ReactDOM from 'react-dom/client';

import App from './App';

import '@fontsource-variable/lexend';
import theme from 'theme/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
