import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useProviderTabsStyles = makeStyles<Theme>(theme => ({
  component: {},
  list: {
    display: 'flex',
    margin: theme.spacing(0, -1),
    padding: 0,
    listStyle: 'none',

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, -1.75),
    },
  },
  listItem: {
    padding: theme.spacing(0, 1),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 1.75),
    },
  },
  tab: {
    display: 'inline-block',
    padding: theme.spacing(2, 0),
    fontFamily: 'inherit',
    fontSize: 16,
    lineHeight: 1.2,
    fontWeight: 700,
    color: fade(theme.palette.text.primary, 0.3),
    textDecoration: 'none',
    border: 0,
    borderBottom: `3px solid transparent`,
    borderRadius: 0,
    backgroundColor: 'transparent',
    cursor: 'pointer',

    '&:hover, &:focus': {
      outline: 'none',
    },

    [theme.breakpoints.up('sm')]: {
      fontSize: 18,
    },
  },
  active: {
    color: theme.palette.text.primary,
  },
}));
