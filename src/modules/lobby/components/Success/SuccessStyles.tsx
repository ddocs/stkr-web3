import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useSuccessStyles = makeStyles<Theme>(theme => ({
  component: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    margin: 0,

    fontSize: 34,
    textAlign: 'center',

    [theme.breakpoints.down('sm')]: {
      fontSize: 22,
    },

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },

    '&::after': {
      position: 'relative',
      content: '""',

      display: 'block',
      width: 80,
      height: 140,
      marginLeft: theme.spacing(4),

      backgroundImage: `url(${require('./assets/mail@2x.png')})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',

      [theme.breakpoints.down('sm')]: {
        width: 68,
        height: 120,
      },

      [theme.breakpoints.down('xs')]: {
        margin: 0,
      },
    },
  },
}));
