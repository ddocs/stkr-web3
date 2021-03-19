import { makeStyles } from '@material-ui/core/styles';

export const useWalletListBnbStyles = makeStyles(theme => ({
  root: {
    maxWidth: 894,
    width: '100%',
    alignSelf: 'center',
    justifySelf: 'center',
    margin: 'auto',
  },
  walletListItem: {
    display: 'block',
    '&:not(:last-child)': {
      marginBottom: theme.spacing(3),
    },
  },
}));
