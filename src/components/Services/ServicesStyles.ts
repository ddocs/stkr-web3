import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useServicesStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(6, 0),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(8, 0),
    },
  },

  subtitle: {
    marginBottom: theme.spacing(2.5),
    fontWeight: 500,
    fontSize: 18,

    [theme.breakpoints.up('sm')]: {
      textAlign: 'center',
    },
  },

  title: {
    maxWidth: 700,
    lineHeight: 1.33,
    margin: theme.spacing(0, 'auto', 7.5),

    [theme.breakpoints.down('xs')]: {
      fontSize: 32,
    },

    [theme.breakpoints.up('sm')]: {
      textAlign: 'center',
    },
  },

  serviceWithAnimation: {
    opacity: 0,
    transition: 'opacity 0.6s ease',
  },

  serviceAnimated: {
    opacity: 1,
  },

  servicesItem: {
    height: '100%',
  },
}));
