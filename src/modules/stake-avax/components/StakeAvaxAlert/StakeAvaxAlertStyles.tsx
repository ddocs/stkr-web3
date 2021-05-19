import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStakeAvaxAlertStyles = makeStyles<Theme>(theme => {
  return {
    root: {
      width: 894,
      margin: `100px auto`,
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    headerContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      width: 60,
      height: 60,
      margin: theme.spacing(2),
    },
    info: {
      margin: theme.spacing(2),
      opacity: 0.5,
      fontSize: 16,
    },
  };
});
