import { makeStyles, Theme } from '@material-ui/core';

export const useFinishClaimStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(5, 5, 3),
  },

  button: {
    minWidth: 144,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));
