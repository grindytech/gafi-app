import { ComponentStyleConfig, extendTheme } from '@chakra-ui/react';
import { convertHex } from 'utils/utils';

export const backgrounds = {
  gradient: {
    linear: {
      1: 'linear-gradient(180deg, #112757 0%, #010318 167.61%)',
      2: 'linear-gradient(135deg, #99CFFF 0%, #2A7AD7 100%)',
      3: 'linear-gradient(135deg, #FFC966 0%, #FF9000 100%)',
      4: 'linear-gradient(135deg, #75EA85 0%, #1FBA53 100%)',
      5: 'linear-gradient(135deg, #8199FB 0%, #2E4FF4 100%)',
      6: 'linear-gradient(135deg, #F0ABFC 0%, #D946EF 100%)',
      7: 'linear-gradient(135deg, #3EDBFF 0%, #00B2FF 100%)',
    },
  },
};

export const colors = {
  primary: {
    a: {
      200: '#AADAFB',
      300: '#7DBEF3',
      400: '#5BA2E7',
      500: '#2A7AD7',
    },
  },
  shader: {
    a: {
      200: '#F4F4F5',
      300: '#E4E4E7',
      400: '#D4D4D8',
      500: '#A1A1AA',
      600: '#71717A',
      700: '#52525B',
      800: '#3F3F46',
      900: '#27272A',
      1000: '#18181B',
    },
  },
  second: {
    green: '#4ADE80',
    orange: '#FF7B00',
    purple: '#8338EC',
  },
  ...backgrounds,
};

export const styles = {
  global: () => ({
    body: {
      bg: '#18181B',
      overflowX: 'hidden',
    },

    '*': {
      scrollBehavior: 'smooth',

      '::-webkit-scrollbar-thumb': {
        bg: 'shader.a.600',
        borderRadius: '2rem',
      },
    },
    '::-webkit-scrollbar': {
      bg: 'transparent',
      width: 2,
      height: 2,
    },
  }),
};

export const fonts = {
  fonts: {
    heading: `'Inter Variable', sans-serif`,
    body: `'Inter Variable', sans-serif`,
  },
};

const CardBox: ComponentStyleConfig = {
  variants: {
    createGames: {
      bg: 'white',
      borderRadius: 'xl',
      border: '0.0625rem solid transparent',
      borderColor: 'shader.a.300',
      padding: 4,
    },
  },
};

const Button: ComponentStyleConfig = {
  variants: {
    unstyled: {
      height: 'auto',
      minWidth: 'auto',
      display: 'flex',
    },
    primary: {
      height: 10,
      px: 4,
      color: 'white',
      bg: 'primary.a.500',
      borderRadius: 'lg',
      fontSize: 'sm',
      fontWeight: 'medium',

      _disabled: {
        // & mean it's me
        ['&, &:hover[disabled]']: {
          color: '#71717A',
          bg: '#3F3F46',
        },
      },

      _hover: {
        bg: convertHex(colors.primary.a[500], 0.65),
      },
    },
  },
};

export const breakpoints = {
  sm: '30rem', // 480px
  '2sm': '36rem', // 576px
  md: '48rem', // 768px
  lg: '62rem', // 992px
  xl: '80rem', // 1280px
  '2xl': '96rem', // 1536px
  '3xl': '120rem', // 1920px
};

export const Container: ComponentStyleConfig = {
  baseStyle: {
    maxWidth: breakpoints['2xl'],
    px: {
      base: 4,
      '2sm': 8,
      lg: 12,
    },
  },
};

export const Input: ComponentStyleConfig = {
  variants: {
    validate: {
      field: {
        border: 'unset',
        borderRadius: 'xl',
        bg: 'shader.a.900',
        color: 'shader.a.300',
        py: 3,
        px: 4,

        _placeholder: {
          color: 'shader.a.600',
        },

        focusBorderColor: {
          boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
        },

        _invalid: {
          boxShadow: '0 0 0 1px var(--chakra-colors-red-500)',
        },
      },
    },
  },
};

const theme = extendTheme({
  colors,
  styles,
  fonts,
  breakpoints,
  components: {
    Container,
    CardBox,
    Button,
    Input,
  },
});

export default theme;
