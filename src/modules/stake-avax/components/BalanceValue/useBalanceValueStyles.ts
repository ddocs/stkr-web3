import { makeStyles, Theme } from '@material-ui/core';

export const useBalanceValueStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto 100%',
    gridGap: theme.spacing(1),
    alignItems: 'end',
  },

  value: {
    fontSize: 36,
    lineHeight: 1,
  },
}));
