import { fade, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export const useHeaderStyles = makeStyles<Theme>(theme => ({
  component: {
    padding: theme.spacing(2.5, 0),
    boxSizing: 'border-box',

    borderBottom: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,

    overflow: 'hidden',
  },

  outerComponent: {
    padding: theme.spacing(6.5, 0),

    borderBottom: 0,

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3.5, 0),
    },
  },

  outer: {
    display: 'grid',
    gridTemplateColumns: 'auto 180px',
    justifyContent: 'space-between',

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'auto 134px',
    },
  },

  inner: {
    display: 'grid',
    gridTemplateColumns: '1fr 190px minmax(315px, auto)',
    gridColumnGap: theme.spacing(4),

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'auto auto',
      justifyContent: 'space-between',
    },
  },

  tabs: {
    width: '100%',
  },

  wallet: {},
}));
