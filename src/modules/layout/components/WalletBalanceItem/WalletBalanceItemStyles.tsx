import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useWalletBalanceItem = makeStyles<Theme>(theme => ({
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: theme.spacing(1, 0, 0, 2),
    fontSize: 'inherit',

    '&::before': {
      position: 'relative',
      content: '""',
      display: 'block',
      width: 16,
      height: 16,
      marginRight: theme.spacing(0.5),
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
    },
  },
}));
