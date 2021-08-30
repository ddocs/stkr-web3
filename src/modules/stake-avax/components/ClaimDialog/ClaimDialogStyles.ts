import { makeStyles } from '@material-ui/core/styles';

export const useClaimDialogStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4, 0),
    maxWidth: 740,
    overflowX: 'hidden',
  },

  container: {
    maxWidth: 550,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(0, 2),
  },

  title: {
    textAlign: 'center',

    [theme.breakpoints.up('sm')]: {
      lineHeight: 1.5,
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
  column: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('xs')]: {
      '&:first-child': {
        paddingTop: theme.spacing(6.5),
      },
      '&:last-child': {
        paddingBottom: theme.spacing(7),
      },
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6.5),
      paddingBottom: theme.spacing(7),
    },
  },
  tokenTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    marginBottom: theme.spacing(6),
  },
  divider: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, -5.5),
    },
  },
}));
