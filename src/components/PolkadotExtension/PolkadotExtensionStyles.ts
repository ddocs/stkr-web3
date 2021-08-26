import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const usePolkadotExtensionStyles = makeStyles<Theme>(theme => ({
  text: {
    padding: theme.spacing(3, 14, 6),
    borderBottom: '1px solid rgba(255,255,255,0.2)',
  },
  button: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(0, 8),
  },
}));
