import { makeStyles } from '@material-ui/core/styles';

export const useDepositStyles = makeStyles(theme => ({
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
  notice: {
    marginBottom: theme.spacing(7),
  },
  confirmations: {},
}));
