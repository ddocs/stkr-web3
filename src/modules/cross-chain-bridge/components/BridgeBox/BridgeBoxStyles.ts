import { makeStyles, Theme } from '@material-ui/core';

export const useBridgeBoxStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
    maxWidth: 920,
    margin: '0 auto',

    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },

  rootPadding: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(6),
    },
  },

  close: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));
