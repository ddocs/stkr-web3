import { Theme } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

export const useHeaderStyles = makeStyles<Theme>(theme => ({
  component: {
    position: 'relative',
    height: theme.spacing(10),
    boxSizing: 'border-box',
    borderBottom: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,
  },

  inner: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1fr auto',
    gap: theme.spacing(0, 2),
    height: '100%',

    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr auto auto',
    },

    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '210px 1fr 204px 78px',
      justifyContent: 'normal',
    },

    '&&': {
      [theme.breakpoints.up('lg')]: {
        maxWidth: 1460,
        padding: theme.spacing(0, 5),
      },
    },
  },

  innerAuthorized: {
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr auto auto auto',
    },

    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '210px auto 1fr auto 78px',
      justifyContent: 'normal',
    },
  },

  wallet: {
    width: '100%',

    [theme.breakpoints.up('lg')]: {
      width: 'auto',
    },
  },

  walletCard: {
    marginBottom: theme.spacing(2),
  },

  mobileNav: {
    position: 'fixed',
    zIndex: 10,
    top: theme.spacing(10),
    right: 0,
    left: 0,
    bottom: 0,

    width: '100%',
    padding: theme.spacing(5.5, 3, 3.5),

    backgroundColor: theme.palette.background.default,
    transition: 'transform 0.3s ease',
    transform: 'translateX(100%)',
    pointerEvents: 'none',
    overflow: 'hidden',
    overflowY: 'auto',
    borderLeft: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,

    [theme.breakpoints.up('sm')]: {
      width: 410,
      left: 'auto',
      padding: theme.spacing(6.5, 5),
    },

    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },

  mobileNavActive: {
    transform: 'translateX(0)',
    pointerEvents: 'initial',
  },

  navShadow: {
    display: 'none',

    [theme.breakpoints.up('sm')]: {
      position: 'fixed',
      zIndex: 10,
      top: theme.spacing(10) + 1,
      bottom: 0,
      left: 0,
      right: 0,
      display: 'block',
      background: fade(theme.palette.background.default, 0.9),
      transition: 'all 0.3s ease',
      visibility: 'hidden',
      opacity: 0,
      pointerEvents: 'none',
    },
  },

  navShadowActive: {
    visibility: 'visible',
    opacity: 1,
  },

  appButton: {
    margin: theme.spacing(0, 0, 2),

    [theme.breakpoints.up('lg')]: {
      margin: theme.spacing(0, 3, 0, 0),
    },
  },

  toggle: {
    marginLeft: theme.spacing(2),
  },

  localLinks: {
    borderTop: `1px solid ${fade(theme.palette.common.white, 0.2)}`,
    paddingTop: theme.spacing(1.5),
  },
}));
