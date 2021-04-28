import { makeStyles, Theme } from '@material-ui/core';

export const useBridgeFormStyles = makeStyles<Theme>(theme => ({
  input: {
    '& .MuiOutlinedInput-input': {
      height: 68,
      padding: theme.spacing(0, 3),
    },
  },

  balance: {
    textAlign: 'right',
    marginBottom: -20,
    fontSize: 14,
    position: 'relative',
    zIndex: 1,
  },

  additionalText: {
    marginBottom: theme.spacing(3),
  },

  loadingBox: {
    display: 'inline-flex',
    marginLeft: theme.spacing(1),
    verticalAlign: 'middle',
  },
}));
