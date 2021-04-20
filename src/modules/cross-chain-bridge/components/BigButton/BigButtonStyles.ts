import { makeStyles, Theme } from '@material-ui/core';

export const useBigButtonStyles = makeStyles<Theme>(theme => ({
  root: {
    width: '100%',
    maxWidth: 376,
    height: theme.spacing(7.5),
  },
}));
