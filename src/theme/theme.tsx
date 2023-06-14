import { extendTheme } from '@chakra-ui/react';

export const backgrounds = {};

export const colors = {
  primary: {
    a: {
      500: '#2A7AD7',
    },
  },
  shader: {
    a: {
      900: '#18181B',
    },
  },
  ...backgrounds,
};

export const styles = {
  global: () => ({
    body: {
      height: '2000px',
    },
  }),
};

export const fonts = {
  fonts: {
    heading: `'Inter Variable', sans-serif`,
    body: `'Inter Variable', sans-serif`,
  },
};

const theme = extendTheme({
  colors,
  styles,
  fonts,
});

export default theme;
