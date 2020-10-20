import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export const useLobbyStyles = makeStyles<Theme>(theme => ({
  component: {
    padding: theme.spacing(8, 0),

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(4.5, 0),
    },
  },
  calculate: {
    marginTop: theme.spacing(18),

    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(10),
    },
  },
  stayTuned: {
    marginTop: theme.spacing(14),

    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(10),
    },
  },
  marketing: {
    marginTop: theme.spacing(20),

    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(6.5),
    },
  },
}));
