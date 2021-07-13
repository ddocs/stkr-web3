import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useMyRewardsStyles = makeStyles<Theme>(theme => ({
  button: {
    padding: theme.spacing(0, 5),
  },
}));
