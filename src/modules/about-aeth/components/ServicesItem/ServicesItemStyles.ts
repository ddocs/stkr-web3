import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useServicesItemStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(4, 4),
    border: '1px solid rgba(255,255,255, 0.2)',
    borderRadius: 48,
    opacity: 0.5,
    transition: 'all 0.3s ease',

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 5),
    },

    '&:hover': {
      border: '1px solid rgba(255,255,255, 0.5)',
      opacity: 1,
    },
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    fontSize: 34,

    [theme.breakpoints.up('sm')]: {
      height: 50,
    },
  },

  metamask: {
    fontSize: 29,
  },
  bitkeep: {
    fontSize: 40,
  },
  imtoken: {
    fontSize: 22,
  },
  onx: {
    fontSize: 38,
  },
  snowswap: {
    fontSize: 40,
  },
  standcash: {
    fontSize: 48,
  },
  trustwallet: {
    fontSize: 38,
  },

  text: {
    fontSize: 16,
    lineHeight: 1.46,
  },
}));
