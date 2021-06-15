import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useBalanceStyles = makeStyles<Theme>(theme => {
  return {
    root: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(5, 5, 3),
      justifyContent: 'space-between',
      [theme.breakpoints.down('md')]: {
        maxWidth: '100%',
      },
    },
    header: {
      fontSize: 20,
      textAlign: 'left',
      marginBottom: theme.spacing(6),
    },
    footer: {
      display: 'grid',
      gridTemplateColumns: 'auto auto',
      gridGap: theme.spacing(2),
      alignItems: 'end',
      textAlign: 'left',
    },
    amount: {
      display: 'grid',
      gridTemplateColumns: 'auto 100%',
      gridGap: theme.spacing(1),
      alignItems: 'end',
    },
  };
});
