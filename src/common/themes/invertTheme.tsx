import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { DEFAULT_FONT, defaultTheme, mainTheme } from './mainTheme';
import { createMuiTheme, fade } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

const PALETTE = {
  type: 'dark',
  primary: {
    light: '',
    main: '#0F0F0F',
    dark: '#0F0F0F',
    contrastText: '#FFE819',
  },
  background: {
    paper: '#FFE819',
  },
  text: {
    primary: '#0F0F0F',
    secondary: fade('#ffffff', 0.5),
  },
  grey: {
    900: '#1D1D1D',
    500: '#343434',
    100: '#C4C4C4',
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

export const invertTheme = createMuiTheme({
  ...mainTheme,
  typography: {
    fontFamily: DEFAULT_FONT,
    color: PALETTE.text.primary,
  },
  palette: PALETTE as PaletteOptions,
  overrides: {
    ...mainTheme.overrides,
    MuiPaper: {
      root: {
        color: PALETTE.text.primary,
        transition: 'none',
        overflow: 'initial',
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
    MuiDivider: {
      root: {
        backgroundColor: '#0F0F0F',
      },
    },
  },
} as ThemeOptions);
