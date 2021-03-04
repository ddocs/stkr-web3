import { fade, Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const useSocialStyles = makeStyles<Theme>(theme => ({
  component: {
    color: theme.palette.text.secondary,
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
  item: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      margin: 0,
    },
  },

  link: {
    display: 'flex',
    transition: 'color 0.2s',

    '&:hover': {
      color: theme.palette.text.primary,
    },
  },

  tooltip: {
    padding: theme.spacing(1.5, 2),
    background: theme.palette.background.default,
    border: `1px solid ${fade(theme.palette.common.white, 0.2)}`,
    borderRadius: 12,
  },

  linksMenu: {
    display: 'grid',
    gap: theme.spacing(1, 0),
  },

  linksItem: {
    padding: theme.spacing(0.5, 0),
  },

  linksItemLabel: {
    justifyContent: 'flex-start',
  },
}));
