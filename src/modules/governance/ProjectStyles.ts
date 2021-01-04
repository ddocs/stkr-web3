import { makeStyles } from '@material-ui/core/styles';

export const useProjectStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(10),
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    width: '100%',
    maxWidth: 955,
    padding: theme.spacing(6.5, 10, 3.5, 10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(3.5),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  led: {
    marginBottom: theme.spacing(1.75),
    '&&': {
      display: 'inline-flex',
    },
  },
  time: {
    marginBottom: theme.spacing(5),
    '& .bold': {
      fontWeight: 500,
    },
  },
  tooltip: {
    background: 'transparent',
  },
  details: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),
  },
  form: {
    width: '100%',
  },
  amount: {
    display: 'grid',
    gridGap: theme.spacing(3),
    gridTemplateColumns: 'auto 1fr auto',
    marginBottom: theme.spacing(4),
  },
  voteButton: {
    height: 'auto',
    padding: theme.spacing(3, 1.5),
    borderRadius: 24,
    fontSize: 20,
    fontWeight: 500,
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#fff',
    },
  },
  voteButtonLabel: {
    display: 'flex',
    flexDirection: 'column',
  },
  divider: {
    width: '100%',
    marginBottom: theme.spacing(7),
  },
  voteCount: {
    marginTop: theme.spacing(0.75),
    fontSize: 16,
    fontWeight: 500,
  },
  slider: {
    marginTop: theme.spacing(7),
  },
  close: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
}));
