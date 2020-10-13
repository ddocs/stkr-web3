import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import ethereum from './assets/ethereum.svg';
import ankr from './assets/ankr.svg';

export const useWalletStyles = makeStyles<Theme>(theme => ({
  component: {},

  toggle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    width: '100%',
    minHeight: 40,
    padding: theme.spacing(0.5, 2),

    boxSizing: 'border-box',

    fontSize: 14,
    lineHeight: 1.2,
    color: theme.palette.text.secondary,

    border: `1px solid ${fade(theme.palette.text.primary, 0.2)}`,
    borderRadius: 2,

    backgroundColor: 'transparent',

    cursor: 'pointer',
  },

  ethereum: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    marginRight: theme.spacing(2),

    '&::before': {
      position: 'relative',
      content: '""',

      display: 'block',
      width: 16,
      height: 16,
      marginRight: theme.spacing(0.5),

      backgroundImage: `url(${ethereum})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
    },
  },

  ankr: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    '&::before': {
      position: 'relative',
      content: '""',

      display: 'block',
      width: 16,
      height: 16,
      marginRight: theme.spacing(0.5),

      backgroundImage: `url(${ankr})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
    },
  },

  address: {
    '&::before': {
      position: 'relative',
      content: '""',

      display: 'block',
      width: 1,
      height: 22,
      margin: theme.spacing(0, 1.5),

      backgroundColor: `${fade(theme.palette.text.primary, 0.2)}`,
    },
  },

  wrapper: {
    position: 'relative',

    width: '100%',
  },

  dropdown: {
    position: 'absolute',
    top: theme.spacing(1),
    right: 0,
  },
}));
