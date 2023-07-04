import { ComponentStyleConfig, extendTheme } from '@chakra-ui/react';

const backgroundSubmit = `
linear-gradient(180deg, #5BA2E7 0%, #2A7AD7 100%) padding-box,
linear-gradient(180deg, #D4EEFD 0%, #2A7AD7 100%) border-box
`;

export const backgrounds = {
  gradient: {
    linear: {
      1: 'linear-gradient(180deg, #112757 0%, #010318 167.61%)',
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
      100: '#D4EEFD',
      200: '#AADAFB',
      500: '#2A7AD7',
      600: '#1E5EB8',
      700: '#15469A',
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
      700: '#3F3F46',
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
    baseStyle: {
      width: 'full',
      color: 'shader.a.900',
      bg: 'white',
      borderRadius: 'xl',
      border: '0.063rem solid',
      borderColor: 'shader.a.300',
      padding: 6,
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
    primary: {
      //in using button show metadata
      px: 4,
      bg: 'primary.a.500',
      color: 'white',
      borderRadius: 'lg',
      _hover: {
        bg: 'primary.a.600',
      },
    },
    more: {
      py: 1.5,
      px: 3,
      color: 'shader.a.900',
      borderRadius: '3xl',
      border: '0.063rem solid',
      borderColor: 'shader.a.400',
    },
    navigation: {
      display: 'flex',
      padding: 0,
      alignItems: 'center',
      borderRadius: 'full',
      bg: 'white',
      color: 'shader.a.900',
      boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.15)',
    },
  },
};

export const Table: ComponentStyleConfig = {
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
    listTable: {
      /*   tbody: {
        padding: 4,
      }, */
      tr: {
        display: 'flex',
        justifyContent: 'space-between',
        verticalAlign: 'top',
        padding: { md: 4, base: 2 },
        _notLast: {
          border: '1px solid',
          borderColor: 'shader.a.200',
        },
        td: {
          padding: 0,
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
export const Tabs: ComponentStyleConfig = {
  variants: {
    unstyled: {
      tab: {
        fontWeight: 'medium',
        fontSize: 'sm',
        bg: 'white',
        color: 'shader.a.900',
        borderRadius: 'lg',
        border: '0.063rem solid',
        borderColor: 'shader.a.400',
        px: 4,
        py: 2,
        _selected: {
          border: 'unset',
          color: 'shader.a.100',
          bg: 'primary.a.500',
        },
      },
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
    Tabs,
    Heading,
  },
});

export default theme;
