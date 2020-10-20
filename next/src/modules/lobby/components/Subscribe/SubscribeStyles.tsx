import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useSubscribeStyles = makeStyles<Theme>(theme => ({
  component: {
    display: 'grid',
    gridTemplateColumns: '260px 620px',
    gridColumnGap: theme.spacing(3),

    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '260px 1fr',
    },

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '100%',
      gridTemplateRows: 'auto auto',
      gridColumnGap: 0,
    },
  },

  title: {
    fontWeight: 400,

    [theme.breakpoints.down('sm')]: {
      fontSize: 38,
      fontWeight: 700,
      textAlign: 'center',
    },
  },

  form: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(4.5),
    },
  },
}));
