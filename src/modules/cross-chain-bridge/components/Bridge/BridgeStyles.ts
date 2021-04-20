import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useBridgeStyles = makeStyles<Theme>(theme => ({
  root: {},

  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(7.5),
  },

  providerFrom: {
    order: -1,
  },

  providerTo: {
    order: 1,
  },

  swapBtn: {
    padding: 0,

    '&:disabled': {
      color: theme.palette.text.primary,
    },
  },

  swapBtnClickable: {
    transition: 'transform 0.2s',

    '&:hover': {
      transform: 'scale(1.1)',
    },

    '&:active': {
      transform: 'scale(1.05)',
      transition: 'transform 0.1s',
    },
  },

  connectBtn: {
    width: '100%',
    maxWidth: 376,
    height: theme.spacing(7.5),
  },
}));
