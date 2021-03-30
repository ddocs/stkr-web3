import { fade, makeStyles, Theme } from '@material-ui/core';

export const useHistoryStyles = makeStyles<Theme>(theme => ({
  title: {
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${fade('#fff', 0.2)}`,
    fontSize: 20,
    fontWeight: 500,
  },

  transactions: {
    display: 'inline-grid',
    gap: theme.spacing(1, 2),
    whiteSpace: 'normal',

    [theme.breakpoints.up('sm')]: {
      alignItems: 'center',
      gridTemplateColumns: '1fr auto 1fr',
    },
  },

  transaction: {
    display: 'inline-grid',
    alignItems: 'center',
    gridTemplateColumns: 'auto 1fr',
    gap: theme.spacing(0, 1),
  },

  directionIcon: {
    marginRight: theme.spacing(0, 1),
    transform: 'rotate(90deg)',
    position: 'relative',
    left: 7,
    bottom: 2,
    fontSize: 10,
    width: '1em',
    height: '1em',

    [theme.breakpoints.up('sm')]: {
      transform: 'none',
      position: 'static',
    },

    '&:before': {
      content: `''`,
      display: 'block',
      width: '1em',
      height: '1em',
      transform: 'rotate(45deg)',
      border: 'solid currentColor',
      color: theme.palette.text.secondary,
      borderWidth: '1px 1px 0 0',
    },
  },

  statusCell: {
    display: 'inline-grid',
    gap: theme.spacing(2, 1),

    [theme.breakpoints.up('sm')]: {
      display: 'grid',
      alignItems: 'center',
      gridTemplateColumns: '1fr auto',
    },
  },

  claimBtn: {
    borderRadius: 30,
    width: 88,
    justifySelf: 'end',

    '&:before': {
      display: 'none',
    },

    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
}));
