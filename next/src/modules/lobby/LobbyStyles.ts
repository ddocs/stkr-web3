import { makeStyles } from '@material-ui/core/styles';

export const useLobbyStyles = makeStyles(theme => ({
  component: {
    padding: theme.spacing(8, 0),
  },

  whatIs: {
    marginTop: theme.spacing(4.5),
  },

  calculate: {
    marginTop: theme.spacing(18),
  },

  marketing: {
    marginTop: theme.spacing(20),
  },
}));
