import { makeStyles } from '@material-ui/styles';
import CheckIcon from './assets/check.svg';
import { Theme } from '@material-ui/core/styles';

export const useFeaturesListStyles = makeStyles((theme: Theme) => ({
  content: {
    '&&': {
      maxWidth: 1360,
    },
  },
  icon: {
    marginTop: 'auto',
    marginBottom: 'auto',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
    },
  },
  paper: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    gridGap: theme.spacing(5),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'auto',
    },
  },
  listItem: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'flex-start',
    '&:before': {
      display: 'block',
      verticalAlign: 'middle',
      content: '""',
      flex: '0 0 18px',
      height: 18,
      background: `url(${CheckIcon}) no-repeat`,
      marginRight: theme.spacing(2),
      marginTop: 3,
    },
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
    },
  },
  action: {
    minWidth: theme.spacing(25),
    '&:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
}));
