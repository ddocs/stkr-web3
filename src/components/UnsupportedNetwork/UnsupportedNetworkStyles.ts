import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useUnsupportedNetworkStyles = makeStyles<Theme>(() => ({
  paper: {
    marginTop: 200,
  },
  header: {
    textAlign: 'center',
  },
}));
