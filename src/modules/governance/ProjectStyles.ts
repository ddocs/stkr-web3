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
    padding: theme.spacing(6.5, 10),
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
    gridTemplateColumns: 'minmax(0, 1fr) 3fr minmax(0, 1fr)',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
  },
  divider: {
    width: '100%',
    marginBottom: theme.spacing(7),
  },
  slider: {
    marginTop: theme.spacing(7),
  },
  close: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  progressBar: {
    marginTop: theme.spacing(7),
  }
}));
