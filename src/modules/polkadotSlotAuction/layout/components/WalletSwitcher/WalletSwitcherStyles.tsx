import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useWalletSwitcherStyles = makeStyles<Theme>(theme => ({
  button: {
    padding: theme.spacing(0, 3, 0),
  },
  walletSelected: {
    background: 'rgba(255,255,255,0.15)',

    '&:hover': {
      background: 'rgba(255,255,255,0.15) !important',
    },
  },
  menu: {
    marginTop: 30,
  },
  menuList: {
    '& > li': {
      paddingRight: 38,
      paddingLeft: 24,
    },
  },
}));
