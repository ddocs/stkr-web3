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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerText: {
      paddingLeft: 10,
    },
    headerContent: {
      fontSize: 20,
      textAlign: 'left',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
    },
    whatIs: {
      '&&': {
        color: '#ffffff',
        textDecoration: 'underline',
      },
    },
    footer: {
      display: 'grid',
      gridTemplateColumns: 'auto auto',
      gridGap: theme.spacing(2),
      marginTop: theme.spacing(6),
      alignItems: 'end',
      textAlign: 'left',
      justifyContent: 'space-between',
    },
    amount: {
      display: 'grid',
      gridTemplateColumns: 'auto 100%',
      gridGap: theme.spacing(1),
      alignItems: 'baseline',
    },
    button: {
      width: 144,
    },
    info: {
      alignSelf: 'start',
      paddingLeft: theme.spacing(2.5),
      borderLeft: `2px solid ${theme.palette.primary.main}`,
      textAlign: 'left',
      fontSize: 14,
    },
  };
});
