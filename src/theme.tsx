import { ComponentStyleConfig, extendTheme } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/theme-tools';
import { mode, createBreakpoints } from '@chakra-ui/theme-tools';

const Card: ComponentStyleConfig = {
  baseStyle: {
    p: '22px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
    minWidth: '0px',
    wordWrap: 'break-word',
    backgroundClip: 'border-box',
  },
  variants: {
    panel: (props: StyleFunctionProps) => ({
      bg: props.colorMode === 'dark' ? 'gray.700' : 'white',
      width: '100%',
      boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
      borderRadius: 'var(--chakra-radii-lg)',
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

export const theme = extendTheme({
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
  colors: { primary: '#51c8c5' },
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
});
