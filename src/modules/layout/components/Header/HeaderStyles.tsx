import { fade, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export const useHeaderStyles = makeStyles<Theme, { height?: number }>(
  theme => ({
    component: {
      position: 'relative',
      zIndex: 1,
      padding: theme.spacing(2.5, 0),
      boxSizing: 'border-box',
      borderBottom: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,
    },
    outer: {
      '&&&': {
        display: 'grid',
        gridTemplateColumns: '210px 1fr 204px 78px',
        justifyContent: 'space-between',
        padding: theme.spacing(0, 8.5),
        [theme.breakpoints.down('lg')]: {
          padding: theme.spacing(0, 5),
        },
        [theme.breakpoints.down('sm')]: {
          gridTemplateColumns: 'auto auto',
        },
        [theme.breakpoints.down('xs')]: {
          padding: theme.spacing(0, 3),
        },
      },
    },
    inner: {
      '&&&': {
        display: 'grid',
        gridTemplateColumns: '210px 1fr auto 78px',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
          gridTemplateColumns: 'auto auto',
          justifyContent: 'space-between',
        },
      },
    },
    tabs: {
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(4),
      },
    },
    wallet: {
      width: 'auto',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    links: {
      alignSelf: 'center',
      [theme.breakpoints.down('sm')]: {
        alignSelf: 'initial',
        marginTop: theme.spacing(4),
      },
    },
    mobile: {
      position: 'fixed',
      top: 80,
      left: '50%',
      right: 0,
      zIndex: 10,
      display: 'none',
      width: '50%',
      height: props => (props.height ? props.height - 80 : undefined),
      padding: theme.spacing(6.5, 5),
      boxSizing: 'border-box',
      backgroundColor: theme.palette.background.default,
      transform: 'translateX(100vw)',
      transitionTimingFunction: 'linear',
      transitionDuration: '300ms',
      transitionProperty: 'transform',
      pointerEvents: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
      },
      [theme.breakpoints.down('xs')]: {
        left: 0,
        width: '100%',
        padding: theme.spacing(3.5, 3),
      },
    },
    visible: {
      transform: 'translateX(0)',
      pointerEvents: 'initial',
    },
    dropdown: {
      flexDirection: 'column-reverse',
      alignItems: 'initial',
      justifyContent: 'flex-end',
      borderLeft: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,
    },
    authDropdown: {
      flexDirection: 'column-reverse',
      justifyContent: 'flex-end',
      borderLeft: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,
    },
    button: {
      '&&': {
        marginRight: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
          marginRight: 'unset',
        },
      },
    },
  }),
);
