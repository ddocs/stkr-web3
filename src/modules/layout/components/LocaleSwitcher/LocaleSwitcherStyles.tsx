import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useLocaleSwitcher = makeStyles<Theme>(theme => ({
  root: {
    minWidth: 78,
  },

  darkened: {
    '& > div': {
      color: theme.palette.text.secondary,
      transition: 'color 0.2s',

      '&:hover': {
        color: theme.palette.text.primary,
      },
    },
  },
}));
