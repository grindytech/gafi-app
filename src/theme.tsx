import { ComponentStyleConfig, extendTheme } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/theme-tools';
import { mode, createBreakpoints } from '@chakra-ui/theme-tools';

import featureFlags from './components/FeatureFlags';

const Card: ComponentStyleConfig = {
  baseStyle: {
    p: 8,
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
    main: (props: StyleFunctionProps) => ({
      float: 'right',
    }),
    rtl: (props: StyleFunctionProps) => ({
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
  secondary: '#64DFDF',
  greyBg: '#F5F7FB',
  gradientColor1: '#56CCF2',
  gradientColor2: '#3860FF',
};

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
              fontWeight: 'semibold',
              borderRadius: '32px',
              color: 'white',
              '&:hover': {
                opacity: 0.8,
              },
            },
            sizes: {
              sm: {},
              xl: {
                h: '56px',
                fontSize: 'lg',
                px: 8,
              },
            },
            variants: {
              solid: {
                bg: `linear-gradient(97.48deg, ${colors.gradientColor1} -9.59%, ${colors.gradientColor2} 107.41%)`,
              },
              ghost: {
                bg: colors.greyBg,
                px: 10,
                py: 5,
                fontSize: 'md',
                borderRadius: '8px',
                fontWeight: 'light',
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
              },
              secondary: {
                bg: colors.secondary,
                opacity: 0.8,
                '&:hover': {
                  opacity: 1,
                },
              },
            },
            defaultProps: {
              size: 'xl',
              variant: 'solid',
              colorScheme: colors.primary,
            },
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
