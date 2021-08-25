import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import aeth from './assets/aeth.svg';
import ankr from './assets/ankr.svg';
import eth from './assets/ethereum.svg';
import bnb from './assets/binance.svg';
import avax from './assets/avax.svg';

const tokenIcons = { aeth, ankr, eth, bnb, avax } as Record<string, string>;

export const useWalletBalanceItem = makeStyles<Theme>(theme => ({
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: theme.spacing(1, 0, 0, 2),
    fontSize: 14,
    lineHeight: '18px',

    '&::before': {
      position: 'relative',
      content: '""',
      display: 'block',
      width: 18,
      height: 18,
      marginRight: theme.spacing(0.75),
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundImage: (props: Record<string, string>) =>
        `url(${tokenIcons[props.name]})`,
    },
  },
}));
