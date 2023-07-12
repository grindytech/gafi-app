import { ComponentStyleConfig, extendTheme } from '@chakra-ui/react';

export const backgrounds = {
  gradient: {
    linear: {
      1: 'linear-gradient(180deg, #112757 0%, #010318 167.61%)',
      2: 'linear-gradient(135deg, #99CFFF 0%, #2A7AD7 100%)',
      3: 'linear-gradient(135deg, #FFC966 0%, #FF9000 100%)',
      4: 'linear-gradient(135deg, #75EA85 0%, #1FBA53 100%)',
      5: 'linear-gradient(135deg, #8199FB 0%, #2E4FF4 100%)',
      6: 'linear-gradient(135deg, #F0ABFC 0%, #D946EF 100%)',
      8: 'linear-gradient(135deg, #FE4C4D 0%, #F02355 100%)',
      9: 'linear-gradient(135deg, #B98DFE 0%, #5D3ADA 100%)',
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
      overflowX: 'hidden',
    },
    '*': {
      scrollBehavior: 'smooth',

      _hover: {
        '::-webkit-scrollbar-thumb': {
          bg: 'shader.a.500',
          borderRadius: '2rem',
        },
      },
      '::-webkit-scrollbar': {
        bg: 'transparent',
        width: 2,
        height: 2,
      },
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
    primary: {
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
    baseStyle: {
      px: 4,
      color: 'shader.a.900',
      borderRadius: 'lg',
      border: '0.063rem solid',
      borderColor: 'shader.a.400',
    },
    cancel: {
      fontSize: 'sm',
      fontWeight: 'medium',
      color: 'shader.a.900',
      border: '0.0625rem solid',
      borderColor: 'shader.a.400',
      borderRadius: 'lg',
      height: 10,
      px: 4,
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
    poolBlockchain: {
      tr: {
        _notLast: {
          borderBottom: '0.0625rem solid',
          borderColor: 'shader.a.300',
        },
      },
      td: {
        fontSize: 'md',
        fontWeight: 'medium',
        color: 'shader.a.900',

        _last: {
          textAlign: 'right',
        },
      },
      th: {
        textTransform: 'capitalize',
        bg: 'shader.a.200',
        borderBottom: '0.0625rem solid',
        borderColor: 'shader.a.300',
        fontSize: 'sm',
        fontWeight: 'normal',
        color: 'shader.a.700',

        _first: {
          borderTopLeftRadius: 'lg',
        },
        _last: {
          borderTopRightRadius: 'lg',
          textAlign: 'right',
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
    sub01: {
      color: 'shader.a.900',
      fontSize: 'xl',
      fontWeight: 'semibold',
      lineHeight: '1.5rem',
    },
    sub02: {
      color: 'shader.a.900',
      fontWeight: 'medium',
      lineHeight: '1.5rem',
      fontsize: 'xl',
    },
  },
};
export const Text: ComponentStyleConfig = {
  baseStyle: {
    color: 'shader.a.900',
  },
  variants: {},
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
export const Input: ComponentStyleConfig = {
  variants: {
    control: {
      field: {
        fontSize: 'md',
        fontWeight: 'normal',
        color: 'shader.a.900',
        border: '0.0625rem solid',
        borderColor: 'shader.a.400',
        borderRadius: 'lg',
        height: 'auto',
        px: 4,
        py: 2,

        _placeholder: {
          color: 'shader.a.400',
        },
        _focusVisible: {
          borderColor: 'blue.500',
          boxShadow: '0 0 0 0.0625rem var(--chakra-colors-blue-500)',
        },
        _invalid: {
          borderColor: 'red.500',
          boxShadow: '0 0 0 0.0625rem var(--chakra-colors-red-500)',
        },
      },
    },
  },
};
export const Select: ComponentStyleConfig = {
  variants: {
    formFilter: {
      field: {
        color: 'shader.a.900',
        fontsize: 'sm',
        fontWeight: 'medium',
        borderRadius: 'lg',
        bg: 'white',
        border: '0.063rem solid',
        borderColor: 'shader.a.400',
        px: 4,
      },

      icon: {
        color: 'primary.a.500',
      },
    },
  },
};
export const FormControl: ComponentStyleConfig = {
  variants: {
    transfer: {
      label: {
        fontWeight: 'medium',
        fontSize: 'sm',
        color: 'shader.a.900',
      },
      input: {
        borderColor: 'shader.a.300',
        fontSize: 'sm',
        fontWeight: 'normal',
        color: 'shader.a.600',
        borderRadius: 'lg',
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
    Select,
    Table,
    Tabs,
    Heading,
    FormControl,
    Input,
  },
});

export default theme;
