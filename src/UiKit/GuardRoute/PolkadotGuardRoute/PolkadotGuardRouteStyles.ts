import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const usePolkadotGuardRouteStyles = makeStyles<Theme>(theme => ({
  paper: {
    marginTop: 200,
    padding: theme.spacing(4, 0),
  },
}));
