import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useLobbyStyles = makeStyles<Theme>(theme => ({
  component: {
    padding: theme.spacing(8, 0),
  },

  calculate: {
    marginTop: theme.spacing(18),
  },

  marketing: {
    marginTop: theme.spacing(20),
  },
}));
