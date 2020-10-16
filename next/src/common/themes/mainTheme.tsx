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
  background: {
    paper: '#1D1D1D',
  },
  text: {
    primary: '#ffffff',
    secondary: fade('#ffffff', 0.5),
  },
  grey: {
    900: '#1D1D1D',
    500: '#343434',
    100: '#C4C4C4',
  },
  error: {
    main: '#FE2222',
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

export const defaultTheme = createMuiTheme({
  breakpoints: BREAKPOINTS,
});

export const selection = {
  color: PALETTE.primary.contrastText,
  backgroundColor: PALETTE.primary.main,
};

const mainTheme = createMuiTheme({
  typography: {
    fontFamily: DEFAULT_FONT,
    color: PALETTE.text.primary,
  },

  palette: PALETTE as PaletteOptions,

  breakpoints: BREAKPOINTS,

  props: {
    MuiUseMediaQuery: {
      noSsr: true,
    },

    MuiButton: {
      disableRipple: true,
      variant: 'contained',
      size: 'medium',
    },

    MuiPaper: {
      elevation: 0,
      square: true,
    },

    MuiSlider: {
      color: 'primary',
    },

    MuiIconButton: {
      disableRipple: true,
    },
  },

  overrides: {
    MuiCssBaseline: {
      '@global': {
        '::selection': {
          ...selection,
        },
      },
    },
    MuiContainer: {
      root: {
        '&&': {
          maxWidth: MAX_WIDTH,
          padding: defaultTheme.spacing(0, 12),

          boxSizing: 'border-box',

          [defaultTheme.breakpoints.down('lg')]: {
            padding: defaultTheme.spacing(0, 8),
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

        transition: 'none',
        overflow: 'initial',
      },
    },

    MuiSlider: {
      rail: {
        backgroundColor: '#555555',
      },

      track: {},

      thumb: {
        width: 20,
        height: 20,

        marginTop: -9,
        marginLeft: -10,
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
        height: 28,
        padding: defaultTheme.spacing(1, 2),

        fontSize: 14,
      },

      sizeLarge: {
        height: 48,
        padding: defaultTheme.spacing(1, 2),

        fontSize: 16,
      },

      textSizeLarge: {
        '&&': {
          height: 'auto',
          padding: 0,
        },
      },

      textSizeSmall: {
        '&&': {
          height: 'auto',
          padding: 0,

          fontSize: 12,
        },
      },

      contained: {
        color: PALETTE.primary.contrastText,
        backgroundColor: PALETTE.text.primary,

        transitionDuration: '300ms',
        transitionProperty: 'color, background-color',
        transitionTimingFunction: 'linear',

        '&:hover, &:focus, &:active': {
          backgroundColor: PALETTE.text.secondary,
        },

        '&$disabled': {},
      },

      containedPrimary: {
        color: PALETTE.primary.contrastText,
        backgroundColor: PALETTE.primary.main,

        transitionDuration: '300ms',
        transitionProperty: 'color, background-color',
        transitionTimingFunction: 'linear',

        '&:hover, &:focus, &:active': {
          backgroundColor: PALETTE.primary.dark,
        },

        '&$disabled': {},
      },

      containedSecondary: {
        color: PALETTE.primary.contrastText,
        backgroundColor: PALETTE.text.secondary,

        transitionDuration: '300ms',
        transitionProperty: 'color, background-color',
        transitionTimingFunction: 'linear',

        '&:hover, &:focus, &:active': {
          backgroundColor: PALETTE.text.primary,
        },

        '&$disabled': {},
      },

      outlined: {
        color: PALETTE.text.primary,
        border: `1px solid ${PALETTE.text.primary}`,

        backgroundColor: 'transparent',

        transitionDuration: '300ms',
        transitionProperty: 'color, border-color, background-color',
        transitionTimingFunction: 'linear',

        '&:hover, &:focus, &:active': {
          color: PALETTE.text.secondary,
          borderColor: PALETTE.text.secondary,

          backgroundColor: 'transparent',
        },

        '&$disabled': {},
      },

      outlinedPrimary: {
        color: PALETTE.primary.main,
        border: `1px solid ${PALETTE.primary.main}`,

        backgroundColor: 'transparent',

        transitionDuration: '300ms',
        transitionProperty: 'color, border-color, background-color',
        transitionTimingFunction: 'linear',

        '&:hover, &:focus, &:active': {
          color: PALETTE.primary.dark,
          borderColor: PALETTE.primary.dark,

          backgroundColor: 'transparent',
        },

        '&$disabled': {},
      },

      outlinedSecondary: {
        color: PALETTE.text.secondary,
        border: `1px solid ${PALETTE.text.secondary}`,

        backgroundColor: 'transparent',

        transitionDuration: '300ms',
        transitionProperty: 'color, border-color, background-color',
        transitionTimingFunction: 'linear',

        '&:hover, &:focus, &:active': {
          color: PALETTE.text.primary,
          borderColor: PALETTE.text.primary,

          backgroundColor: 'transparent',
        },

        '&$disabled': {},
      },

      text: {
        height: 'auto',
        padding: 0,
        minWidth: 0,

        color: PALETTE.text.primary,
        fontWeight: 400,
        whiteSpace: 'nowrap',

        backgroundColor: 'transparent',

        transitionDuration: '300ms',
        transitionProperty: 'color',
        transitionTimingFunction: 'linear',

        '&:hover, &:focus, &:active': {
          color: PALETTE.text.secondary,

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

      textSecondary: {
        color: PALETTE.text.secondary,

        backgroundColor: 'transparent',

        transitionDuration: '300ms',
        transitionProperty: 'color',
        transitionTimingFunction: 'linear',

        '&:hover, &:focus, &:active': {
          color: PALETTE.text.primary,

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
      },

      h2: {
        fontSize: 38,
        fontWeight: 700,
        lineHeight: 1.2,
      },

      h3: {
        fontSize: 32,
        fontWeight: 700,
        lineHeight: 1.2,
      },

      h4: {
        fontSize: 28,
        fontWeight: 700,
        lineHeight: 1.2,
      },

      h5: {
        fontSize: 18,
        fontWeight: 700,
        lineHeight: 1.2,
      },

      h6: {
        fontSize: 18,
        fontWeight: 700,
        lineHeight: 1.2,
      },

      subtitle1: {
        fontSize: 16,
        fontWeight: 700,
        lineHeight: 1.2,
      },

      subtitle2: {
        fontSize: 14,
        fontWeight: 700,
        lineHeight: 1.2,
      },

      body1: {
        fontSize: 18,
        fontWeight: 400,
        lineHeight: 1.5,
      },

      body2: {
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 1.5,
      },

      colorPrimary: {
        color: PALETTE.primary.main,
      },

      colorSecondary: {
        color: PALETTE.text.secondary,
      },
    },
    MuiIconButton: {
      root: {
        '& svg': {
          transition: 'color 100ms cubic-bezier(0.47, 0, 0.75, 0.72)',
        },
        '&:hover': {
          backgroundColor: 'transparent',

          '& svg': {
            color: '#fff',
          },
        },
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: fade('#fff', 0.2),
      },
    },
    MuiFormHelperText: {
      root: {
        fontSize: 14,
        marginTop: 0,
      },
    },
  },
} as ThemeOptions);

export { mainTheme };
