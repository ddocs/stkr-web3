import { makeStyles } from '@material-ui/core/styles';

export const useTransactionCompleted = makeStyles(theme => ({
  root: {
    minHeight: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: theme.spacing(3),
  },
}));
