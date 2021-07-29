import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useUnsupportedNetworkStyles = makeStyles<Theme>(theme => ({
  paper: {
    marginTop: 200,
  },
  header: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
}));
