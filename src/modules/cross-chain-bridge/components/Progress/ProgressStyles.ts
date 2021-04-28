import { makeStyles, Theme } from '@material-ui/core';

export const useProgressStyles = makeStyles<Theme>(theme => ({
  root: {},

  title: {
    margin: theme.spacing(0, 0, 2.5),
    fontWeight: 500,

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2, 0, 2.5),
    },
  },

  noBorder: {
    borderBottom: 'none',
  },
}));
