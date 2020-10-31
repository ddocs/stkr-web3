import { fade, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export const useHeaderStyles = makeStyles<Theme>(theme => ({
  component: {
    position: 'relative',
    zIndex: 1,
    padding: theme.spacing(2.5, 0),
    boxSizing: 'border-box',
    borderBottom: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,
  },
  outer: {
    '&&': {
      display: 'grid',
      gridTemplateColumns: 'auto 180px',
      justifyContent: 'space-between',
      padding: theme.spacing(0, 8.5),
      [theme.breakpoints.down('lg')]: {
        padding: theme.spacing(0, 5),
      },
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'auto 134px',
      },
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(0, 3),
      },
    },
  },
  inner: {
    '&&': {
      display: 'grid',
      gridTemplateColumns: '1fr 190px auto',
      gridColumnGap: theme.spacing(4),
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'auto auto',
        justifyContent: 'space-between',
      },
    },
  },
  tabs: {
    width: '100%',
  },
  wallet: {
    width: 'auto',
  },
}));
