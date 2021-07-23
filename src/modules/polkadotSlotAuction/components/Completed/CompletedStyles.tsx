import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useCompletedStyles = makeStyles<Theme>(theme => ({
  button: {
    padding: theme.spacing(0, 5),
    marginRight: theme.spacing(0.5),
  },
  myBalance: {
    color: theme.palette.text.secondary,
  },
}));
