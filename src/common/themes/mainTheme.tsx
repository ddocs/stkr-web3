import { createMuiTheme, fade } from '@material-ui/core';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { NOTIFICATION_AUTO_HIDE_DURATION } from '../const';
import { ReactComponent as ArrowDownIcon } from './assets/arrowDown.svg';
import { StepIcon } from './components/StepIcon/StepIcon';

export const DEFAULT_FONT = '"Helvetica Neue", sans-serif';

export const PALETTE = {
  type: 'dark',
  primary: {
    light: '',
    main: '#006DFF',
    dark: '#006DFF',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#006DFF',
  },
  background: {
    paper: '#1D1D1D',
    default: '#0F0F0F',
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

export const MAX_WIDTH = 1620;

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
    MuiTabs: {
      variant: 'fullWidth',
    },
    MuiTab: {
      disableRipple: true,
    },
    MuiSnackbar: {
      autoHideDuration: NOTIFICATION_AUTO_HIDE_DURATION,
    },
    MuiAlert: {
      icon: false,
    },
    MuiTextField: {
      InputLabelProps: {
        shrink: true,
      },
      InputProps: { disableUnderline: true },
    },
    MuiTypography: {
      component: 'div',
    },
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
    MuiSelect: {
      IconComponent: ArrowDownIcon,
    },
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiStepLabel: {
      StepIconComponent: StepIcon,
    },
  },
  overrides: {
    MuiSnackbar: {
      root: {
        '&&': {
          top: 0,
          right: 0,
          left: 0,
          bottom: 'auto',
          width: '100%',
          transform: 'translateX(0)',
        },
      },
    },
    MuiAlert: {
      root: {
        width: '100%',
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 0,
      },
      standardError: {
        backgroundColor: '#FF362D',
      },
      message: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
        width: '100%',
        textAlign: 'center',
      },
    },
    MuiCssBaseline: {
      '@global': {
        '::selection': {
          ...selection,
        },
        '.web3modal-modal-lightbox': {
          '&&': {
            zIndex: defaultTheme.zIndex.modal,
          },
        },
        a: {
          textDecoration: 'none',
        },
      },
    },
    MuiContainer: {
      root: {
        '&&': {
          padding: defaultTheme.spacing(0, 15),

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
        transition: 'none',
        overflow: 'initial',
      },
      outlined: {
        border: `1px solid ${fade('#ffffff', 0.2)}`,
        background: PALETTE.background.default,
        padding: '52px 92px',
        [defaultTheme.breakpoints.down('sm')]: {
          padding: 32,
        },
      },
      rounded: {
        borderRadius: 32,

        [defaultTheme.breakpoints.up('sm')]: {
          padding: 45,
        },
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
        borderRadius: 60,
        '&:hover, &:focus, &:active': {
          '&:not($disableElevation)': {
            transform: 'scale(1.05)',
          },
          backgroundColor: PALETTE.text.secondary,
        },
        '&$disabled': {},
      },
      containedPrimary: {
        color: PALETTE.primary.contrastText,
        backgroundColor: PALETTE.primary.main,
        transitionDuration: '300ms',
        transitionProperty: 'color, background-color, transform',
        transitionTimingFunction: 'linear',
        '&:hover, &:focus, &:active': {
          '&:not($disableElevation)': {
            transform: 'scale(1.05)',
          },
          backgroundColor: PALETTE.primary.dark,
        },
        '&$disabled': {},
      },
      containedSecondary: {
        color: PALETTE.primary.main,
        backgroundColor: fade(PALETTE.primary.main, 0.15),
        transitionDuration: '300ms',
        transitionProperty: 'color, background-color',
        transitionTimingFunction: 'linear',
        '&:hover, &:focus, &:active': {
          backgroundColor: fade(PALETTE.primary.main, 0.2),
        },
      },
      outlined: {
        color: PALETTE.text.primary,
        border: `1px solid ${PALETTE.text.primary}`,
        backgroundColor: 'transparent',
        transitionDuration: '300ms',
        transitionProperty: 'color, border-color, background-color',
        transitionTimingFunction: 'linear',
        '&:hover, &:focus, &:active': {
          color: PALETTE.primary.contrastText,
          backgroundColor: PALETTE.text.primary,
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
          color: PALETTE.primary.contrastText,

          backgroundColor: PALETTE.primary.main,
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
          color: PALETTE.primary.contrastText,
          backgroundColor: PALETTE.text.secondary,
          border: `1px solid ${PALETTE.grey['900']}`,
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
    MuiButtonGroup: {
      groupedOutlinedHorizontal: {
        '&:not(:first-child)': {
          borderLeft: `1px solid ${PALETTE.background.default}`,
        },
      },
    },
    MuiTypography: {
      root: {
        '& a': {
          color: PALETTE.primary.main,
          textDecoration: 'none',
        },
      },
      h1: {
        fontSize: 48,
        fontWeight: 700,
        lineHeight: 1.2,
        [defaultTheme.breakpoints.down('sm')]: {
          fontSize: 38,
        },
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
        [defaultTheme.breakpoints.down('md')]: {
          fontSize: 16,
        },
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
    MuiDialog: {
      paper: {
        width: 'calc(100% - 10px)',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 32,

        [defaultTheme.breakpoints.up('sm')]: {
          borderRadius: 45,
        },

        '&&&': {
          [defaultTheme.breakpoints.down('xs')]: {
            maxWidth: 'calc(100% - 10px)',
          },
        },
      },

      paperFullWidth: {
        [defaultTheme.breakpoints.down('xs')]: {
          width: 'calc(100% - 10px)',
        },
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: fade('#fff', 0.2),
      },
      light: {
        backgroundColor: PALETTE.primary.main,
      },
    },
    MuiFormHelperText: {
      root: {
        fontSize: 14,
        marginTop: 0,
      },
    },
    MuiInputLabel: {
      shrink: {
        fontSize: 24,
        fontWeight: 700,
        color: '#fff',
      },
    },
    MuiInput: {
      input: {
        fontSize: 18,
        height: 48,
        background: '#292929',
        borderRadius: 4,
        paddingLeft: 16,
        paddingRight: 16,
        boxSizing: 'border-box',
      },

      inputMultiline: {
        minHeight: 130,
        padding: '14px 16px',
      },

      formControl: {
        'label + &': {
          marginTop: 42,
        },
      },
      underline: {
        '&::after': {
          content: 'none',
        },
      },
    },
    MuiSelect: {
      outlined: {
        '&, &:focus': {
          background: 'transparent',
          border: '1px solid #3F3F3F',
          borderRadius: 65,
          fontSize: 14,
          fontWeight: 500,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      iconOutlined: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        margin: 'auto',
        right: 10,
      },
    },
    MuiPopover: {
      paper: {
        marginTop: 12,
        border: '1px solid #3F3F3F',
        boxShadow: 'none',
        borderRadius: 12,
      },
    },
    MuiList: {
      padding: {
        '&&': {
          padding: 0,
        },
      },
    },
    MuiListItem: {
      root: {
        color: fade(defaultTheme.palette.common.white, 0.5),
        '&.Mui-selected, &:hover': {
          '&&': {
            backgroundColor: 'transparent',
            color: defaultTheme.palette.common.white,
          },
        },
      },
    },
    MuiMenu: {
      paper: {
        backgroundColor: PALETTE.background.default,
      },
    },
    MuiTabs: {
      indicator: {
        display: 'none',
      },
    },
    MuiTab: {
      root: {
        fontSize: 22,
      },
    },
    MuiTimelineContent: {
      root: {
        fontSize: 16,
        fontWeight: 400,
      },
    },
    MuiLinearProgress: {
      colorSecondary: {
        backgroundColor: PALETTE.background.default,
        border: '1px solid rgba(254, 254, 254, 0.2)',
        borderRadius: 12,
        height: 8,
      },
      barColorSecondary: {
        backgroundColor: '#ffffff',
      },
    },
    MuiLink: {
      root: {
        cursor: 'pointer',
      },
    },
    MuiTooltip: {
      popper: {
        zIndex: 1300,
      },
    },
    MuiStepper: {
      root: {
        background: 'none',
      },
    },
    MuiStepIcon: {
      root: {},
      active: {},
    },
  },
} as ThemeOptions);

export { mainTheme };
