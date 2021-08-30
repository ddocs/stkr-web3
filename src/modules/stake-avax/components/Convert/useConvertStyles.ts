import { makeStyles, Theme } from '@material-ui/core';

export const useConvertStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(5, 5, 3),
    margin: theme.spacing(0, 0, 5),
  },

  button: {
    minWidth: 144,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));
