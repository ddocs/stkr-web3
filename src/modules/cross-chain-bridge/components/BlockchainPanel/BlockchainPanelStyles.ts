import { lighten, makeStyles, Theme } from '@material-ui/core';

export const useBlockchainPanelStyles = makeStyles<Theme>(theme => ({
  root: {
    minHeight: theme.spacing(8.5),
    padding: theme.spacing(2, 2),

    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: theme.spacing(0, 2),
    alignItems: 'center',

    background: lighten(theme.palette.background.default, 0.025),
    borderRadius: 8,
  },

  clickable: {
    transition: 'background 0.2s',
    cursor: 'pointer',
    userSelect: 'none',

    '&:hover': {
      background: lighten(theme.palette.background.default, 0.05),
    },
  },

  icon: {
    fontSize: 38,
  },

  menu: {
    padding: theme.spacing(1, 0),
  },

  menuItem: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: theme.spacing(0, 1.5),
    alignItems: 'center',
  },
}));
