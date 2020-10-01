import { createMuiTheme, fade } from '@material-ui/core';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

export const DEFAULT_FONT = '"Helvetica Neue", sans-serif';

const PALETTE = {
  type: 'dark',
  primary: {
    light: '',
    main: '#FFE819',
    dark: '#FFB800',
    contrastText: '#000000',
  },
  text: {
    primary: '#ffffff',
    secondary: fade('#ffffff', 0.5),
  },
  error: {
    main: '#F1534C',
  },
  warning: {
    main: '#FFB63C',
  },
  success: {
    main: '#36C98E',
  },
  divider: '#E1E4EB',
};

const BREAKPOINTS = {
  values: {
    xs: 0,
    sm: 768,
    md: 960,
    lg: 1280,
    xl: 1440,
  },
};

const MAX_WIDTH = 1620;

const defaultTheme = createMuiTheme({
  breakpoints: BREAKPOINTS,
});

const selection = {
  color: PALETTE.primary.contrastText,
  backgroundColor: PALETTE.primary.main,
};

const mainTheme = createMuiTheme({
  typography: {
    fontFamily: DEFAULT_FONT,
  },

  palette: PALETTE as PaletteOptions,

  breakpoints: BREAKPOINTS,

  props: {
    MuiUseMediaQuery: {
      noSsr: true,
    },

    MuiButton: {
      color: 'primary',
      disableRipple: true,
      variant: 'contained',
      size: 'medium',
    },

    MuiPaper: {
      elevation: 0,
      square: true,
    },
  },

  overrides: {
    MuiContainer: {
      root: {
        '&&': {
          maxWidth: MAX_WIDTH,
          padding: defaultTheme.spacing(0, 20),

          boxSizing: 'border-box',

          [defaultTheme.breakpoints.down('lg')]: {
            padding: defaultTheme.spacing(0, 10),
          },

          [defaultTheme.breakpoints.down('md')]: {
            padding: defaultTheme.spacing(0, 5),
          },

          [defaultTheme.breakpoints.down('xs')]: {
            padding: defaultTheme.spacing(0, 3),
          },
        },
      },
      maxWidthLg: {
        '&&': {
          maxWidth: MAX_WIDTH,
        },
      },
    },

    MuiPaper: {
      root: {
        color: PALETTE.text.primary,
        backgroundColor: '#1D1D1D',

        transition: 'none',
      },
    },

    MuiButton: {
      root: {
        height: 36,
        padding: defaultTheme.spacing(1, 2),
        boxSizing: 'border-box',

        fontFamily: DEFAULT_FONT,
        fontSize: 14,
        lineHeight: 1.2,
        fontWeight: 500,

        textDecoration: 'none',
        textTransform: 'initial',

        borderRadius: 2,
      },

      sizeSmall: {
        height: 34,
        padding: defaultTheme.spacing(1, 2),

        fontSize: 12,
      },

      sizeLarge: {
        height: 48,
        padding: defaultTheme.spacing(1, 2),

        fontSize: 16,
      },

      textSizeSmall: {
        padding: 0,
      },

      contained: {
        color: PALETTE.text.primary,
        backgroundColor: PALETTE.primary.main,

        transitionDuration: '300ms',
        transitionProperty: 'color, background-color',
        transitionTimingFunction: 'linear',

        '&:hover, &:focus, &:active': {
          backgroundColor: PALETTE.primary.dark,
        },

        '&$disabled': {},
      },

      outlined: {
        color: PALETTE.primary.main,
        border: `1px solid ${PALETTE.primary.main}`,

        backgroundColor: 'transparent',

        transitionDuration: '300ms',
        transitionProperty: 'color, border-color, background-color',
        transitionTimingFunction: 'linear',

        '&:hover, &:focus, &:active': {
          color: PALETTE.primary.dark,
          borderColor: PALETTE.primary.dark,
        },

        '&$disabled': {},
      },

      text: {
        height: 'auto',
        padding: 0,
        minWidth: 0,

        color: PALETTE.text.primary,

        backgroundColor: 'transparent',

        transitionDuration: '300ms',
        transitionProperty: 'color',
        transitionTimingFunction: 'linear',

        '&:hover, &:focus, &:active': {
          color: fade(PALETTE.text.primary, 0.5),

          backgroundColor: 'transparent',
        },

        '&$disabled': {},
      },

      textPrimary: {
        color: PALETTE.primary.main,

        backgroundColor: 'transparent',

        transitionDuration: '300ms',
        transitionProperty: 'color',
        transitionTimingFunction: 'linear',

        '&:hover, &:focus, &:active': {
          color: PALETTE.primary.dark,

          backgroundColor: 'transparent',
        },

        '&$disabled': {},
      },
    },

    MuiTypography: {
      h1: {
        fontSize: 48,
        fontWeight: 700,
        lineHeight: 1.2,
        color: PALETTE.primary.dark,

        '&::selection': selection,

        '& *::selection': selection,
      },

      h2: {
        fontSize: 38,
        fontWeight: 700,
        lineHeight: 1.2,
        color: PALETTE.primary.dark,

        '&::selection': selection,

        '& *::selection': selection,
      },

      h3: {},

      h4: {
        fontSize: 28,
        fontWeight: 700,
        lineHeight: 1.2,
        color: PALETTE.primary.dark,

        '&::selection': selection,

        '& *::selection': selection,
      },

      h5: {},

      h6: {},

      subtitle1: {
        fontSize: 28,
        fontWeight: 700,
        lineHeight: 1.2,
        color: PALETTE.primary.dark,

        '&::selection': selection,

        '& *::selection': selection,
      },

      subtitle2: {
        fontSize: 14,
        fontWeight: 700,
        lineHeight: 1.2,
        color: PALETTE.primary.dark,

        '&::selection': selection,

        '& *::selection': selection,
      },

      body1: {
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 1.5,
        color: PALETTE.primary.dark,

        '&::selection': selection,

        '& *::selection': selection,
      },

      body2: {},

      caption: {},
    },
  },
} as ThemeOptions);

export { mainTheme };
