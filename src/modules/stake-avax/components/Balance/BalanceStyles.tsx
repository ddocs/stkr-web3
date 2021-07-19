import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useBalanceStyles = makeStyles<Theme>(theme => {
  return {
    root: {
      padding: theme.spacing(4, 3, 3),

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(5, 5, 3),
      },

      [theme.breakpoints.up('lg')]: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 65,
      },
    },

    header: {
      fontSize: 20,
      marginBottom: theme.spacing(6),
    },

    footer: {
      display: 'grid',
      gridTemplateColumns: 'auto auto',
      gridGap: theme.spacing(2),
      alignItems: 'end',
    },

    amount: {
      display: 'grid',
      gridTemplateColumns: 'auto 100%',
      gridGap: theme.spacing(1),
      alignItems: 'end',
    },

    amountLabel: {
      fontSize: 36,
      lineHeight: 1,
    },
  };
});
