import { ComponentStyleConfig, extendTheme } from '@chakra-ui/react';

const backgroundSubmit = `
linear-gradient(180deg, #5BA2E7 0%, #2A7AD7 100%) padding-box,
linear-gradient(180deg, #D4EEFD 0%, #2A7AD7 100%) border-box
`;

export const backgrounds = {
  gradient: {
    linear: {
      2: 'linear-gradient(135deg, #99CFFF 0%, #2A7AD7 100%)',
      3: 'linear-gradient(135deg, #FFC966 0%, #FF9000 100%)',
      4: 'linear-gradient(135deg, #75EA85 0%, #1FBA53 100%)',
      5: 'linear-gradient(135deg, #8199FB 0%, #2E4FF4 100%)',
      6: 'linear-gradient(135deg, #F0ABFC 0%, #D946EF 100%)',
    },
  },
};

export const colors = {
  primary: {
    a: {
      200: '#AADAFB',
      500: '#2A7AD7',
    },
  },
  shader: {
    a: {
      100: '#FAFAFA',
      200: '#F4F4F5',
      300: '#E4E4E7',
      400: '#D4D4D8',
      500: '#71717A',
      600: '#52525B',
      800: '#27272A',
      900: '#18181B',
    },
  },
  second: {
    red: '#DB2330',
    orange: '#FF7B00',
    purple: '#8338EC',
  },
  ...backgrounds,
};

export const styles = {
  global: () => ({
    body: {
      bg: 'shader.a.100',
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
    createGameSubmit: {
      display: 'flex',
      margin: 'auto',
      minWidth: 'auto',
      height: 'auto',
      px: 6,
      py: 3.5,
      variant: 'unstyled',
      borderRadius: 'xl',
      border: '0.09375rem solid transparent',
      bg: backgroundSubmit,
      fontSize: 'sm',
      fontWeight: 'semibold',
      color: 'white',
      _focusVisible: {},
    },
  },
};

const Table: ComponentStyleConfig = {
  variants: {
    createGameSubmit: {
      td: {
        padding: 0,
        border: 'unset',
        fontSize: 'md',
        wordBreak: 'break-all',

        _odd: {
          pt: 4,
          pb: { md: 4 },
          color: 'shader.a.600',
          fontWeight: 'medium',
        },
        _even: {
          pb: 4,
          pt: { md: 4 },
          color: 'shader.a.900',
          fontWeight: 'semibold',
          textAlign: {
            md: 'right',
          },
        },
      },
      tr: {
        _notLast: {
          borderBottom: '0.0625rem solid',
          borderColor: 'shader.a.200',
        },

        flexDirection: 'column',
        display: {
          base: 'flex',
          md: 'table-row',
        },
      },
    },
  },
};

const Heading: ComponentStyleConfig = {
  variants: {
    switch: {
      fontSize: 'sm',
      fontWeight: 'semibold',
      color: 'primary.a.500',
    },
    game: {
      fontSize: 'md',
      fontWeight: 'medium',
      color: 'shader.a.600',
    },
  },
};

const theme = extendTheme({
  colors,
  styles,
  fonts,
  components: {
    CardBox,
    Button,
    Table,
    Heading,
  },
});

export default theme;
