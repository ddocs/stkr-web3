import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useCreateBeaconChainStyles = makeStyles<Theme>(theme => ({
  component: {
    padding: theme.spacing(8, 0),
    height: '100%',

    boxSizing: 'border-box',
  },

  wrapper: {
    height: '100%',
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    height: '100%',
  },
}));
