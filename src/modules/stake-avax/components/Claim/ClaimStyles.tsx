import { Theme } from '@material-ui/core';
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

  info: {
    paddingLeft: theme.spacing(1.5),
    borderLeft: `2px solid ${theme.palette.primary.main}`,
    textAlign: 'left',
    fontSize: 14,
    maxWidth: 255,
  },

  button: {
    minWidth: 120,
    padding: 0,
  },
}));
