import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useWalletBalance = makeStyles<Theme>(theme => ({
  root: {
    overflow: 'hidden',
    fontSize: 14,
  },

  grid: {
    display: 'flex',
    flexFlow: 'row wrap',
    margin: theme.spacing(-1, 0, 0, -2),
  },

  listMenu: {
    padding: theme.spacing(1, 0.5),
    '& > li': {
      padding: theme.spacing(0, 2, 1, 0),
    },
  },

  paperMenu: {
    marginTop: theme.spacing(2),
  },
}));
