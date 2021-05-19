import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useConnectStyles = makeStyles<Theme>(theme => {
  return {
    root: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(5),
      margin: `${theme.spacing(5)}px 180px`,
      [theme.breakpoints.down('lg')]: {
        margin: theme.spacing(5, 10),
      },
    },
    header: {
      fontSize: 20,
      textAlign: 'center',
      margin: theme.spacing(3),
    },
  };
});
