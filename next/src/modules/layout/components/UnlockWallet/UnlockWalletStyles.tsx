import { fade, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

import metaMask from './assets/meta.svg';
import connectWallet from './assets/wallet.svg';

export const useUnlockWalletStyles = makeStyles<Theme>(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    padding: theme.spacing(9, 10),
  },

  title: {
    margin: 0,
  },

  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 200px)',
    gridColumnGap: theme.spacing(4.5),

    margin: 0,
    marginTop: theme.spacing(6.5),
    padding: 0,

    listStyle: 'none',
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    padding: theme.spacing(2.5),

    fontSize: 18,
    lineHeight: 1.2,
    fontWeight: 700,

    border: `1px solid ${fade(theme.palette.text.primary, 0.2)}`,
    borderRadius: 4,

    '&::before': {
      position: 'relative',

      display: 'grid',
      justifyContent: 'center',
      alignContent: 'center',

      width: 100,
      height: 100,
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),

      borderRadius: '50%',

      backgroundColor: '#0F0F0F',
    },
  },

  itemMetaMask: {
    '&::before': {
      content: `url("${metaMask}")`,
    },
  },

  itemConnectWallet: {
    '&::before': {
      content: `url("${connectWallet}")`,
    },
  },

  button: {
    width: '100%',
    marginTop: theme.spacing(6),
  },
}));
