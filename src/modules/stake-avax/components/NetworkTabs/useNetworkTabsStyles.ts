import { makeStyles, Theme } from '@material-ui/core';

export const useNetworkTabsStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'grid',
    gap: theme.spacing(2, 4),

    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },

  item: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: theme.spacing(0, 2),
    alignItems: 'center',
    padding: theme.spacing(2.5, 2.5),
    fontWeight: 500,
    fontSize: 18,
    lineHeight: 1.3,
    cursor: 'pointer',
    borderRadius: 22,
  },

  itemSelected: {
    background: 'rgba(96, 96, 96, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
  },

  itemDisabled: {
    opacity: 0.5,
    cursor: 'default',
  },
}));
