import { fade, makeStyles, Theme } from '@material-ui/core';

export const useClaimDialogStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(9, 0, 0),
    backgroundColor: theme.palette.background.default,

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 0, 0),
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

  container: {
    '&&': {
      maxWidth: 520 + theme.spacing(4),
      padding: theme.spacing(0, 2),
    },
  },

  title: {
    maxWidth: 395,
    marginBottom: theme.spacing(5),

    [theme.breakpoints.down('xs')]: {
      fontSize: 24,
    },

    [theme.breakpoints.up('sm')]: {
      maxWidth: 395,
      margin: theme.spacing(0, 'auto', 5),
      textAlign: 'center',
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

  balanceLoadingBox: {
    display: 'inline-flex',
    marginLeft: theme.spacing(1),
    verticalAlign: 'middle',
  },

  btnWrapper: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: 200,
      margin: '0 auto',
    },
  },

  info: {
    paddingLeft: theme.spacing(2),
    borderLeft: `2px solid ${theme.palette.primary.main}`,
  },
}));
