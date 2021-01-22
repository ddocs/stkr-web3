import { Theme } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

export const useHeaderStyles = makeStyles<Theme, { height?: number }>(
  theme => ({
    component: {
      position: 'relative',
      zIndex: 1,
      padding: theme.spacing(2.5, 0),
      boxSizing: 'border-box',
      borderBottom: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,
    },

    inner: {
      display: 'grid',
      alignItems: 'center',
      gridTemplateColumns: 'auto auto',
      justifyContent: 'space-between',

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
      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: '210px auto 1fr auto 78px',
        justifyContent: 'normal',
      },
    },

    wallet: {
      width: '100%',

      [theme.breakpoints.up('lg')]: {
        width: 'auto',
        order: 1,
      },
    },

    links: {
      marginTop: theme.spacing(4),

      [theme.breakpoints.up('lg')]: {
        alignSelf: 'center',
        margin: 0,
      },
    },

    linksAuthorized: {},

    mobile: {
      position: 'fixed',
      zIndex: 10,
      display: 'flex',
      top: 80,
      right: 0,
      left: 0,

      width: '100%',
      height: props => (props.height ? props.height - 80 : undefined),
      padding: theme.spacing(3.5, 3),

      backgroundColor: theme.palette.background.default,
      transition: 'transform 0.3s',
      transform: 'translateX(100%)',
      pointerEvents: 'none',
      overflow: 'hidden',
      overflowY: 'auto',

      [theme.breakpoints.up('sm')]: {
        width: 395,
        left: 'auto',
        padding: theme.spacing(6.5, 5),
      },

      [theme.breakpoints.up('lg')]: {
        display: 'none',
      },
    },

    mobileUnAuth: {
      flexDirection: 'column',
      borderLeft: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,
    },

    mobileAuth: {
      flexDirection: 'column',
      borderLeft: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,
    },

    mobileVisible: {
      transform: 'translateX(0)',
      pointerEvents: 'initial',
    },

    navShadow: {
      display: 'none',

      [theme.breakpoints.up('sm')]: {
        position: 'fixed',
        zIndex: 10,
        top: 80,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'block',
        background: fade(theme.palette.background.default, 0.8),
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

    button: {
      [theme.breakpoints.up('lg')]: {
        marginRight: theme.spacing(3),
        order: 1,
      },
    },

    switcherWrap: {
      display: 'flex',
      alignItems: 'center',
      margin: theme.spacing(0, 0, 3, 'auto'),

      [theme.breakpoints.up('lg')]: {
        order: 2,
        margin: 0,
      },
    },
  }),
);
