import { Theme } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

export const useHeaderStyles = makeStyles<Theme>(theme => ({
  component: {
    position: 'relative',
    height: theme.spacing(10),
    boxSizing: 'border-box',
    borderBottom: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,
  },

  inner: {
    display: 'grid',
    alignItems: 'center',
    gap: theme.spacing(0, 2),
    height: '100%',
    gridTemplateColumns: '1fr auto auto',

    '&&': {
      [theme.breakpoints.up('lg')]: {
        maxWidth: 1460,
        padding: theme.spacing(0, 5),
      },
    },
  },

  button: {
    padding: theme.spacing(0, 3, 0),
  },
}));
