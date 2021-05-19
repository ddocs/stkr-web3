import { makeStyles, fade } from '@material-ui/core/styles';

export const useConfirmConvertDialogStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    '&&': {
      padding: theme.spacing(6, 0),
    },
  },
  body: {
    padding: theme.spacing(3, 0, 4),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 0, 8),
    },
  },

  footer: {
    borderTop: `1px solid ${fade(theme.palette.text.primary, 0.2)}`,
    paddingTop: theme.spacing(6),
  },

  wrapper: {
    padding: theme.spacing(0, 2.5),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 5),
      maxWidth: 720,
      margin: '0 auto',
    },
  },

  footerWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },

  submit: {
    width: 230,
    height: 54,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },

  close: {
    position: 'absolute',

    [theme.breakpoints.up('xs')]: {
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
    [theme.breakpoints.up('sm')]: {
      right: theme.spacing(3),
      top: theme.spacing(3),
    },
  },
}));
