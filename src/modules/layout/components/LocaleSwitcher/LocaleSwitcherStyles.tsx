import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export const useLocaleSwitcher = makeStyles<Theme>(() => ({
  root: {
    minWidth: 78,
  },
}));
