import { fade, makeStyles, Theme } from '@material-ui/core';

export const useUnstakeSuccessDialogStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(9, 0, 0),
    backgroundColor: theme.palette.background.default,
    textAlign: 'center',

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(10, 0, 0),
    },
  },

  container: {
    '&&': {
      maxWidth: 520 + theme.spacing(4),
      padding: theme.spacing(0, 2),
    },
  },

  footer: {
    marginTop: theme.spacing(6),
    padding: theme.spacing(4, 0),
    borderTop: `1px solid ${fade(theme.palette.text.primary, 0.1)}`,

    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8),
    },
  },

  title: {
    marginBottom: theme.spacing(3),
  },

  btn: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: 220,
    },
  },

  closeBtn: {
    padding: 0,
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),

    [theme.breakpoints.up('sm')]: {
      right: theme.spacing(4),
      top: theme.spacing(4),
    },
  },
}));
