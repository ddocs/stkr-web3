import { makeStyles, Theme } from '@material-ui/core';

export const useStakeBtnStyles = makeStyles<Theme>(theme => ({
  root: {
    width: theme.spacing(21),
    height: theme.spacing(6),
  },

  icon: {
    '& > *:first-child': {
      color: 'inherit',
      fontSize: 14,
    },
  },
}));
