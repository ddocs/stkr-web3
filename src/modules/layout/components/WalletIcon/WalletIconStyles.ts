import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useWalletIconStyles = makeStyles<Theme>(theme => ({
  icon: {
    display: 'block',
    width: '1em',
    height: '1em',
    borderRadius: 4,
    color: theme.palette.text.secondary,
    objectFit: 'contain',

    '& svg': {
      display: 'block',
      width: '1em',
      height: '1em',
      fontSize: 'inherit',
      fill: 'currentColor',
    },
  },
}));
