import { fade, makeStyles } from '@material-ui/core/styles';

export const useRulesDialogStyles = makeStyles(theme => ({
  close: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
    fontSize: 28,

    [theme.breakpoints.up('sm')]: {
      right: theme.spacing(3),
      top: theme.spacing(3),
    },
  },

  dialogPaper: {
    padding: theme.spacing(8, 2, 6),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(10),
    },
  },

  dialogContent: {
    maxWidth: 500,
    margin: '0 auto',
    overflow: 'visible',

    '&&': {
      padding: theme.spacing(1, 0),
    },
  },

  title: {
    margin: theme.spacing(0, 0, 2.5),

    [theme.breakpoints.down('xs')]: {
      fontSize: 24,
    },
  },

  text: {
    margin: theme.spacing(0, 0, 4),

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 0, 6.5),
    },
  },

  warning: {
    display: 'flex',

    padding: theme.spacing(1.8),
    margin: theme.spacing(0, 'auto', 5.5),
    maxWidth: 420,
    minHeight: 40,

    backgroundColor: fade(theme.palette.common.white, 0.2),
    borderRadius: 18,
  },

  warningIcon: {
    marginRight: 10,
  },

  link: {
    display: 'block',
    color: 'inherit',
    textDecoration: 'none',
  },

  item: {
    marginBottom: theme.spacing(3.5),
  },

  list: {
    margin: theme.spacing(0, 0, 5),
    padding: theme.spacing(0, 0, 0, 3.5),
  },

  listBigOffset: {
    margin: theme.spacing(0, 0, 7.5),
  },

  btnWrap: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: 276,
      margin: '0 auto',
    },
  },
}));
