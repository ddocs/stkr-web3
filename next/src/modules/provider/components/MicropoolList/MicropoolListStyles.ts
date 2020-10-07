import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useMicropoolListStyles = makeStyles<Theme>(theme => ({
  component: {},

  empty: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    height: '100%',
    padding: theme.spacing(5, 0),

    boxSizing: 'border-box',
  },

  caption: {
    margin: 0,
  },

  create: {
    minWidth: 180,
    marginTop: theme.spacing(4.5),
  },

  table: {
    width: '100%',
  },
}));
