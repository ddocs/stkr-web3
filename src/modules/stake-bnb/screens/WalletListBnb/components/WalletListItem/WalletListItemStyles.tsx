import { makeStyles } from '@material-ui/core/styles';

export const useWalletListItemStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'baseline',
    padding: theme.spacing(2.5),
  },
  name: {
    marginRight: theme.spacing(1.5),
  },
  address: {
    marginLeft: 'auto',
  },
}));
