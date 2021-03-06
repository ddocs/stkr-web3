import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import aeth from './assets/aeth.svg';
import ankr from './assets/ankr.svg';
import ethereum from './assets/ethereum.svg';
import binance from './assets/binance.svg';
import avax from './assets/avax.svg';

export const useWalletBalance = makeStyles<Theme>(theme => ({
  root: {
    overflow: 'hidden',
    fontSize: 14,
  },

  grid: {
    display: 'flex',
    flexFlow: 'row wrap',
    margin: theme.spacing(-1, 0, 0, -2),
  },

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

  aeth: {
    '&::before': {
      backgroundImage: `url(${aeth})`,
    },
  },

  ethereum: {
    '&::before': {
      backgroundImage: `url(${ethereum})`,
    },
  },

  binance: {
    '&::before': {
      backgroundImage: `url(${binance})`,
    },
  },

  ankr: {
    '&::before': {
      backgroundImage: `url(${ankr})`,
    },
  },

  avax: {
    '&::before': {
      backgroundImage: `url(${avax})`,
    },
  },
}));
