import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useCompletedStyles = makeStyles<Theme>(theme => ({
  button: {
    padding: theme.spacing(0, 5),
  },
  subText: {
    color: 'grey',
    margin: '0',
  },
}));
