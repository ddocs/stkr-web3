import { createMuiTheme } from '@material-ui/core';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

export const DEFAULT_FONT = '"Lab Grotesque", sans-serif';

export const PALETTE: PaletteOptions = {
  type: 'light',
  primary: {
    light: '#569AEF',
    main: '#2075E8',
    dark: '#181F49',
    contrastText: '#EEF0F4',
  },
  text: {
    primary: '#1A2439',
    secondary: '#364457',
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
  grey: {
    900: '#1A2439',
    800: '#364457',
    700: '#6B82A2',
    300: '#F5F8FD',
    200: '#E1E4EB',
    100: '#EEF0F4',
  },
  divider: '#E1E4EB',
};

const mainTheme = createMuiTheme({
  typography: {
    fontFamily: DEFAULT_FONT,
    body2: {
      fontFamily: DEFAULT_FONT,
    },
  },
  palette: PALETTE,
  props: {
    MuiUseMediaQuery: {
      noSsr: true,
    },
    MuiButton: {
      color: 'primary',
      disableRipple: true,
      variant: 'contained',
      size: 'large',
    },
    MuiTypography: {
      h1: {
        fontSize: 30,
        fontWeight: 'bold',
        lineHeight: '38px',
        '&$paragraph': {
          marginBottom: 8,
        },
      },
      h2: {
        fontSize: 26,
        fontWeight: 'bold',
        lineHeight: '120%',
      },
      h3: {
        fontSize: 22,
        fontWeight: 'bold',
        lineHeight: '120%',
      },
      h4: {
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: '120%',
      },
      h5: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: '120%',
      },
      h6: {
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: '120%',
      },
      subtitle1: {
        fontSize: 18,
        fontWeight: 'normal',
        lineHeight: '130%',
      },
      subtitle2: {
        fontSize: 16,
        fontWeight: 'normal',
        lineHeight: '120%',
      },
      body1: {
        fontSize: 14,
        fontWeight: 'normal',
        lineHeight: '130%',
        '&$paragraph': {
          marginBottom: 8,
        },
      },
      body2: {
        fontSize: 12,
        fontWeight: 500,
        lineHeight: '130%',
        '&$paragraph': {
          marginBottom: 8,
        },
      },
      caption: {
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: '130%',
        '&$paragraph': {
          marginBottom: 8,
        },
      },
    },
  },
} as ThemeOptions);

export { mainTheme };
