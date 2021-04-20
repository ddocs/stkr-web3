import { makeStyles, Theme } from '@material-ui/core';

export const useAvailableStyles = makeStyles<Theme>(theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(13),
      paddingBottom: theme.spacing(13),
    },
  },

  title: {
    marginBottom: theme.spacing(7),
    fontSize: 24,
    fontWeight: 500,
    textAlign: 'center',
  },

  btn: {
    width: '100%',
    maxWidth: 376,
    height: theme.spacing(7.5),
  },
}));
