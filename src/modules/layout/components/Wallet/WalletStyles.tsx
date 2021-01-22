import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ankr from './assets/ankr.svg';
import ethereum from './assets/ethereum.svg';

export const useWalletStyles = makeStyles<Theme>(theme => ({
  component: {},
  toggle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    minHeight: 40,
    padding: theme.spacing(0.5, 0),
    boxSizing: 'border-box',
    fontSize: 14,
    lineHeight: 1.2,
    color: theme.palette.text.secondary,
    border: `none`,
    backgroundColor: 'transparent',
    cursor: 'pointer',

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(0.5, 2),
    },
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
    '&::after': {
      position: 'relative',
      order: -1,
      content: '""',
      display: 'block',
      width: 1,
      height: 22,
      margin: theme.spacing(0, 1.5, 0, 1.8),
      backgroundColor: fade(theme.palette.text.primary, 0.2),
    },
  },
  wrapper: {
    position: 'relative',
    width: '100%',
  },
  dropdown: {
    position: 'absolute',
    zIndex: theme.zIndex.tooltip,
    top: theme.spacing(1),
    right: 0,
    [theme.breakpoints.down('sm')]: {
      right: 0,
      left: 0,
    },
  },
}));
