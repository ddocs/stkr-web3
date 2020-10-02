import { fade, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export const useHeaderStyles = makeStyles<Theme>(theme => ({
  component: {
    padding: theme.spacing(2.5, 0),
    boxSizing: 'border-box',

    borderBottom: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,
  },

  outerComponent: {
    padding: theme.spacing(6.5, 0),
  },

  outer: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr 180px',
    gridColumnGap: theme.spacing(8),
  },

  inner: {
    display: 'grid',
    gridTemplateColumns: '1fr 190px 240px',
    gridColumnGap: theme.spacing(4),
  },

  tabs: {
    width: '100%',
  },

  wallet: {},

  list: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',

    margin: 0,
    padding: 0,

    listStyle: 'none',
  },

  item: {
    marginRight: theme.spacing(5),
  },

  link: {},

  active: {
    color: theme.palette.primary.main,
    pointerEvents: 'none',
  },
}));
