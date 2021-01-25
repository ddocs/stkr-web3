import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStartStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(4, 0),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 0),
    },
  },

  box: {
    padding: theme.spacing(5, 2.5, 4),
    borderRadius: 48,
    background: '#141416',

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(9, 6),
      textAlign: 'center',
    },
  },

  title: {
    fontSize: 24,
    margin: theme.spacing(0, 0, 2.5),

    [theme.breakpoints.up('sm')]: {
      fontSize: 32,
      margin: theme.spacing(0, 0, 4.5),
    },
  },

  text: {
    margin: '0 auto',
    maxWidth: 954,

    [theme.breakpoints.up('sm')]: {
      fontSize: 24,
    },
  },

  btnWrap: {
    margin: theme.spacing(4.5, 0, 0),

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(6, 0, 0),
    },
  },

  btn: {
    width: '100%',

    [theme.breakpoints.up('sm')]: {
      minWidth: 254,
      width: 'auto',
    },
  },
}));
