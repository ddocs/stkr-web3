import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useProviderTabsStyles = makeStyles<Theme>(theme => ({
  component: {},
  list: {
    display: 'grid',
    gridColumnGap: theme.spacing(3.5),
    gridTemplateColumns: 'auto auto',
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  tab: {
    display: 'inline-block',
    padding: theme.spacing(2, 0),
    fontFamily: 'inherit',
    fontSize: 18,
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
  },
  active: {
    color: theme.palette.primary.main,
  },
}));
