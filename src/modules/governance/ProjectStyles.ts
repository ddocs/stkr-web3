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
  },
  led: {
    marginBottom: theme.spacing(1.75),
    '&&': {
      display: 'inline-flex',
    },
  },
  time: {
    '& .bold': {
      fontWeight: 500,
    },
  },
  tooltip: {},
  details: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
  },
  amount: {
    display: 'grid',
    gridGap: theme.spacing(2),
    gridTemplateColumns: 'auto 1fr auto',
  },
}));
