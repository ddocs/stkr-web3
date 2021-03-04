import { makeStyles } from '@material-ui/core/styles';

export const useCreateNodeDialogStyles = makeStyles(theme => ({
  close: {
    position: 'absolute',
    right: 10,
    top: 10,

    [theme.breakpoints.up('md')]: {
      right: 0,
      top: 0,
    },
  },

  closeTabletUp: {
    display: 'none',

    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },

  closeMobile: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  dialogPaper: {
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: 44,
    backgroundColor: '#0F0F0F',
  },

  root: {
    padding: theme.spacing(3, 0, 0),

    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'stretch',
      padding: 0,
    },

    '&:first-child': {
      [theme.breakpoints.up('md')]: {
        paddingTop: 0,
      },
    },
  },

  separator: {
    height: 1,
    background: 'rgba(255, 255, 255, 0.2)',

    [theme.breakpoints.up('md')]: {
      width: 1,
      height: 'auto',
    },
  },

  side: {
    flex: 1,
    padding: theme.spacing(7, 4),
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(13, 8.5, 8.5),
    },
  },

  items: {
    padding: 0,
    opacity: 0.5,
    fontSize: 16,
    textAlign: 'left',

    '& li': {
      padding: theme.spacing(1.5),
    },
  },

  button: {
    marginTop: theme.spacing(2),
    width: 256,
    padding: theme.spacing(2),
  },
}));
