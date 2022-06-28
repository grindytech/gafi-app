import { color, ComponentStyleConfig, extendTheme } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/theme-tools';
import { createBreakpoints, mode } from '@chakra-ui/theme-tools';
import { Global } from '@emotion/react';

import featureFlags from 'components/FeatureFlags';

const Card: ComponentStyleConfig = {
  baseStyle: {
    p: { base: 2, lg: 4, xl: 6 },
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
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
      border: '2px dashed #EEF1FF',
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

const MainPanel: ComponentStyleConfig = {
  baseStyle: {
    float: 'right',
    maxWidth: '100%',
    overflow: 'auto',
    position: 'relative',
    maxHeight: '100%',
    transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
    transitionDuration: '.2s, .2s, .35s',
    transitionProperty: 'top, bottom, width',
    transitionTimingFunction: 'linear, linear, ease',
  },
  variants: {
    main: () => ({
      float: 'right',
    }),
    rtl: () => ({
      float: 'left',
    }),
  },
  defaultProps: {
    variant: 'main',
  },
};

const PanelContainer: ComponentStyleConfig = {
  baseStyle: {
    p: '30px 15px',
    minHeight: 'calc(100vh - 123px)',
  },
};

const PanelContent: ComponentStyleConfig = {
  baseStyle: {
    ms: 'auto',
    me: 'auto',
    ps: '15px',
    pe: '15px',
  },
};

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
});

const colors = {
  primary: '#2667FF',
  hoverPrimary: '#588aff',
  secondary: '#64DFDF',
  greyBg: '#F5F7FB',
  greyBtnBg: '#D7D6D6',
  greyTitle: '#B0B0B0',
  gradientColor1: '#56CCF2',
  gradientColor2: '#3860FF',
  btnHover: 'rgba(255, 255, 255, 0.25)',
  successToast: '#2CBF6E',
};

export const Fonts = () => (
  <Global
    styles={`/* cyrillic-ext */
    @font-face {
      font-family: 'PT Sans';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/ptsans/v17/jizaRExUiTo99u79D0-ExcOPIDUg-g.woff2) format('woff2');
      unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
    }
    /* cyrillic */
    @font-face {
      font-family: 'PT Sans';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/ptsans/v17/jizaRExUiTo99u79D0aExcOPIDUg-g.woff2) format('woff2');
      unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
    }
    /* latin-ext */
    @font-face {
      font-family: 'PT Sans';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/ptsans/v17/jizaRExUiTo99u79D0yExcOPIDUg-g.woff2) format('woff2');
      unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    /* latin */
    @font-face {
      font-family: 'PT Sans';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/ptsans/v17/jizaRExUiTo99u79D0KExcOPIDU.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    /* cyrillic-ext */
    @font-face {
      font-family: 'PT Sans';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/ptsans/v17/jizfRExUiTo99u79B_mh0OOtLR8a8zILig.woff2) format('woff2');
      unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
    }
    /* cyrillic */
    @font-face {
      font-family: 'PT Sans';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/ptsans/v17/jizfRExUiTo99u79B_mh0OqtLR8a8zILig.woff2) format('woff2');
      unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
    }
    /* latin-ext */
    @font-face {
      font-family: 'PT Sans';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/ptsans/v17/jizfRExUiTo99u79B_mh0OCtLR8a8zILig.woff2) format('woff2');
      unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    /* latin */
    @font-face {
      font-family: 'PT Sans';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/ptsans/v17/jizfRExUiTo99u79B_mh0O6tLR8a8zI.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
      `}
  />
);

export const theme = extendTheme(
  featureFlags.isDisplayNewDashboardUI
    ? {
        breakpoints,
        styles: {
          global: (props: StyleFunctionProps) => ({
            '#root': {
              position: 'relative',
              minHeight: '100vh',
              bg: mode('gray.50', 'gray.800')(props),
            },
          }),
        },
        colors,
        fonts: {
          heading: 'PT Sans',
          body: 'PT Sans',
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
          MainPanel,
          PanelContainer,
          PanelContent,
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
              fontSize: 'md',
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
                h: '56px',
                fontSize: 'lg',
                px: 8,
                borderRadius: '4xl',
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
                  color: 'blackAlpha.700',
                },
              },
              ghost: {
                bg: colors.greyBg,
                px: 10,
                py: 5,
                fontSize: 'md',
                fontWeight: 'normal',
                '&:hover': {
                  bg: 'gray.200',
                },
              },
              white: {
                bg: 'white',
                color: 'black',
              },
              primary: {
                bg: colors.primary,
                fontWeight: 'bold',
                color: 'white',
                _hover: {
                  opacity: 0.8,
                  _disabled: {
                    opacity: 0.4,
                    bg: 'primary',
                  },
                },
              },
              secondary: {
                bg: colors.secondary,
                opacity: 0.8,
                '&:hover': {
                  opacity: 1,
                },
              },
              outline: {
                bg: 'white',
                color: colors.primary,
                borderRadius: '4xl',
                border: `2px solid ${colors.primary}`,
                '&:hover': {
                  bg: colors.primary,
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
              variant: 'solid',
              colorScheme: colors.primary,
            },
          },
          Text: {
            baseStyle: {
              fontSize: 'md',
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
                borderRadius: '3xl',
                p: { base: 2, md: 6, xl: 8 },
              },
              item: {
                _focus: { bg: colors.btnHover },
                py: { base: 2, xl: 3 },
                px: { base: 2, md: 6, xl: 8 },
                m: 0,
                borderRadius: '3xl',
                color: 'white',
                mb: { base: 1, xl: 2 },
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
              tablist: {
                justifyContent: 'flex-start',
                '.chakra-tabs__tab': {
                  _selected: { color: 'primary', bg: 'greyBg' },
                },
              },
              tabpanel: {
                p: 0,
                mt: 8,
              },
            }),
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
          },
          Modal: {
            baseStyle: () => ({
              header: {
                mb: 4,
                fontWeight: 'bold',
                color: 'primary',
                fontSize: '2xl',
              },
              dialog: {
                borderRadius: '2xl',
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
        },
      }
    : {
        breakpoints,
        styles: {
          global: (props: StyleFunctionProps) => ({
            '#root': {
              position: 'relative',
              minHeight: '100vh',
              bg: mode('gray.50', 'gray.800')(props),
            },
          }),
        },
        colors: { primary: '51c8c5' },
        components: {
          Card,
          CardBody,
          CardHeader,
          MainPanel,
          PanelContainer,
          PanelContent,
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
        },
      }
);
