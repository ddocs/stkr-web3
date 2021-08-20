import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useOngoingStyles = makeStyles<Theme>(theme => ({
  button: {
    padding: theme.spacing(0, 5),
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  plus: {
    fontSize: 22,
    margin: theme.spacing(-0.5, 0, 0, 1),
  },
  img: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: theme.spacing(1),
  },
}));
