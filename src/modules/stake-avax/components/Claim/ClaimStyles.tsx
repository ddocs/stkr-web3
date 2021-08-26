import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useClaimStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(4, 3, 3),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 5, 3),
    },

    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderRadius: 65,
    },
  },

  button: {
    minWidth: 140,
    padding: 0,

    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
    },
  },

  buttonLabel: {
    display: 'block',
  },

  buttonInfo: {
    display: 'block',
    fontSize: 12,
    color: fade(theme.palette.text.primary, 0.3),
  },
}));
