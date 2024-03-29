import { ComponentStyleConfig, extendTheme } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/theme-tools';
import { mode } from '@chakra-ui/theme-tools';
import { Global } from '@emotion/react';

const Card: ComponentStyleConfig = {
  baseStyle: {
    p: { sm: 6, '2xl': 8 },
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minWidth: '0px',
    wordWrap: 'break-word',
    backgroundClip: 'border-box',
    bg: '#FFFFFF',
  },
  variants: {
    panel: (props: StyleFunctionProps) => ({
      bg: props.colorMode === 'dark' ? 'gray.700' : 'white',
      width: '100%',
      boxShadow: '3px 4px 10px rgba(0, 0, 0, 0.05)',
      borderRadius: 'var(--chakra-radii-2xl)',
    }),
    dashed: (props: StyleFunctionProps) => ({
      border: '1px dashed #B4CAFF',
      bg: props.colorMode === 'dark' ? 'gray.700' : colors.greyBg,
      width: '100%',
      borderRadius: 'var(--chakra-radii-2xl)',
    }),
    solid: (props: StyleFunctionProps) => ({
      bg: props.colorMode === 'dark' ? 'gray.700' : colors.greyBg,
      width: '100%',
      borderRadius: 'var(--chakra-radii-2xl)',
      border: `2px dashed ${colors.borderBottom}`,
      boxShadow: 'none',
    }),
  },
  defaultProps: {
    variant: 'panel',
  },
};

const CardBody: ComponentStyleConfig = {
  baseStyle: {
    display: 'flex',
    width: '100%',
  },
};

const CardHeader: ComponentStyleConfig = {
  baseStyle: {
    display: 'flex',
    width: '100%',
  },
};

const colors = {
  primary: '#2A79D6',
  hoverPrimary: '#588aff',
  secondary: '#4AD7D7',
  hoverSecondary: '#39a9a9',
  greyText: '#686868',
  greyBg: '#F5F7FB',
  borderBottom: '#EEF1FF',
  disableBtnText: '#3B3B3B',
  greyBtnBg: '#D7D6D6',
  greyTitle: '#B0B0B0',
  gradientColor1: '#56CCF2',
  gradientColor2: '#2A79D6',
  btnHover: 'rgba(255, 255, 255, 0.25)',
  successToast: '#2CBF6E',
};

export const Fonts = () => (
  <Global
    styles={`/* cyrillic-ext */
    @font-face {
      font-family: 'Helvetica';
      src: local('Helvetica'), url(../fonts/Helvetica-Font/Helvetica.ttf) format('truetype');
    }
    /* latin */
    @font-face {
      font-family: 'Red Hat Display';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/redhatdisplay/v12/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbouRQk8z_lWZk33BGg.woff) format('woff');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
      `}
  />
);

export const theme = extendTheme({
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      '#root': {
        position: 'relative',
        minHeight: '100vh',
        bg: mode('gray.50', 'gray.800')(props),
      },
      '*:focus:not(:focus-visible)': {
        outline: 'none',
        'box-shadow': 'none !important',
      },
    }),
  },
  colors,
  fonts: {
    heading: `'Red Hat Display', sans-serif`,
    body: 'Helvetica, serif',
  },
  radii: {
    '2xl': '1rem',
    '3xl': '1.5rem',
    '4xl': '2rem',
    base: '0.25rem',
    full: '9999px',
    lg: '0.5rem',
    md: '0.375rem',
    none: '0',
    sm: '0.125rem',
    xl: '0.75rem',
  },
  components: {
    Card,
    CardBody,
    CardHeader,
    Link: {
      variants: {
        'no-underline': {
          _hover: {
            textDecoration: 'none',
          },
          height: 10,
          minWidth: 10,
          paddingInlineStart: 4,
          paddingInlineEnd: 4,
          display: 'inline-flex',
          alignItems: 'center',
        },
      },
    },
    Button: {
      baseStyle: {
        lineHeight: 6,
        fontSize: { base: 'sm', md: 'md' },
        fontWeight: 'normal',
        borderRadius: '32px',
        color: 'white',
        '.chakra-icon': {
          w: 5,
          h: 5,
        },
      },
      sizes: {
        sm: {
          h: '40px',
          fontSize: 'md',
          px: 4,
          borderRadius: 'lg',
          fontWeight: 'bold',
        },

        xl: {
          h: '44px',
          fontSize: { base: 'sm', md: 'md' },
          fontWeight: { base: 'normal', md: 'bold' },
          borderRadius: '4xl',
          px: 8,
          '.chakra-icon': {
            w: 6,
            h: 6,
          },
        },
      },
      variants: {
        solid: {
          _hover: {
            opacity: 0.8,
          },
          fontWeight: 'bold',
          fontSize: 'md',
          bg: `linear-gradient(97.48deg, ${colors.gradientColor1} -9.59%, ${colors.gradientColor2} 107.41%)`,
          _disabled: {
            bg: colors.greyBtnBg,
            color: colors.disableBtnText,
          },
        },
        ghost: {
          bg: colors.greyBg,
          px: 10,
          py: 5,
          '&:hover': {
            bg: 'gray.200',
          },
        },
        white: {
          bg: 'white',
          color: 'black',
          fontWeight: 'normal',
          boxShadow: '0px 4px 17px rgba(0, 0, 0, 0.2)',
        },
        primary: {
          bg: colors.primary,
          color: 'white',
          _disabled: {
            bg: colors.greyBtnBg,
            color: colors.disableBtnText,
          },
          _hover: {
            opacity: 0.8,
            _disabled: {
              opacity: 0.8,
              bg: colors.greyBtnBg,
            },
          },
        },
        secondary: {
          bg: colors.secondary,
          _hover: {
            bg: colors.hoverSecondary,
            _disabled: {
              opacity: 0.4,
              bg: colors.hoverSecondary,
            },
          },
        },
        outline: {
          bg: 'white',
          color: colors.primary,
          borderRadius: '4xl',
          border: `2px solid ${colors.primary}`,
          '&:hover': {
            bg: colors.primary,
            borderColor: 'primary',
            color: 'white',
            _disabled: {
              opacity: 0.4,
              border: `2px solid primary`,
              color: 'primary',
            },
          },
        },
        transparent: {
          bg: 'transparent',
          color: 'black',
        },
        delete: {
          bg: 'red.500',
          color: 'white',
        },
      },
      defaultProps: {
        size: 'xl',
        variant: 'primary',
        colorScheme: colors.primary,
      },
    },
    Text: {
      baseStyle: {
        fontSize: { base: 'sm', md: 'md' },
        fontWeight: 'normal',
        '.chakra-icon': {
          w: 5,
          h: 5,
        },
      },
      sizes: {},
      variants: {},
      defaultProps: {},
    },
    Menu: {
      baseStyle: () => ({
        list: {
          bg: `linear-gradient(227.25deg, ${colors.gradientColor2} 2.24%, ${colors.gradientColor1} 127.36%)`,
          border: 'none',
          borderRadius: '2xl',
          p: { base: 4 },
          '.chakra-menu__menuitem:last-child': {
            mb: 0,
          },
          '.chakra-menu__menuitem-option:last-child': {
            mb: 0,
          },
        },
        item: {
          _focus: { bg: colors.btnHover },
          py: { base: 2 },
          px: { base: 6 },
          m: 0,
          borderRadius: '2xl',
          color: 'white',
          mb: 2,
        },
        button: {
          '.chakra-icon': {
            w: 5,
            h: 5,
          },
        },
      }),
    },
    Tabs: {
      baseStyle: () => ({
        root: {
          w: 'full',
        },
        tab: {
          bg: 'transparent',
          fontWeight: 'bold',
          lineHeight: 6,
        },
        tabpanel: {
          p: 0,
          mt: 8,
        },
      }),
      variants: {
        'soft-rounded': () => ({
          tablist: {
            justifyContent: 'space-evenly',
            '.chakra-tabs__tab': {
              _selected: { color: 'primary', bg: 'greyBg' },
            },
          },
        }),
        enclosed: () => ({
          tab: {
            _selected: { color: 'primary' },
          },
        }),
      },
    },
    Table: {
      baseStyle: () => ({
        thead: {
          fontSize: 'md',
          lineHeight: '10',
          fontWeight: 'normal',
          textTransform: 'capitalize',
        },
      }),
      sizes: {
        sm: () => ({
          caption: {
            fontSize: 'sm',
          },
          td: {
            px: 2,
            py: 4,
            fontSize: 'md',
          },
          th: {
            px: 3,
            py: 4,
            fontSize: 'md',
          },
        }),
      },

      variants: {
        simple: () => ({
          th: {
            fontWeight: 'normal',
            fontSize: 'sm',
            color: colors.greyText,
          },
        }),
      },
    },
    Modal: {
      baseStyle: () => ({
        header: {
          fontWeight: 'bold',
          color: 'primary',
          fontSize: '2xl',
          p: 0,
          mb: { sm: 8 },
        },
        dialog: {
          borderRadius: '2xl',
          mx: 4,
          p: { sm: 4, md: 6, lg: 8 },
        },
        body: {
          p: 0,
        },
        footer: {
          p: 0,
          mt: { sm: 16 },
        },
      }),
    },
    Input: {
      variants: {
        outline: () => ({
          addon: {
            bg: colors.primary,
            display: 'flex',
            minWidth: 16,
            justifyContent: 'center',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            '&:hover': {
              bg: colors.hoverPrimary,
            },
          },
        }),
      },
      defaultProps: { size: 'lg', variant: 'outline' },
    },
    Alert: {
      baseStyle: () => ({
        container: {
          maxWidth: { base: '300px', md: 600 },
        },
        description: {
          maxWidth: { base: '240px', md: 450 },
        },
      }),
    },
  },
});
