import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useToggleStyles = makeStyles<Theme>(theme => ({
  component: {
    width: 32,
    height: 32,
  },
}));
