import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useSubscribeStyles = makeStyles<Theme>(theme => ({
  component: {
    '&&': {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gridColumnGap: theme.spacing(3),

      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'auto 1fr',
      },

      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: '100%',
        gridRowGap: theme.spacing(3.5),
      },
    },
  },

  title: {
    '&&': {
      [theme.breakpoints.down('md')]: {
        fontSize: 22,
      },

      [theme.breakpoints.down('xs')]: {
        fontSize: 28,
        textAlign: 'center',
      },
    },
  },
}));
