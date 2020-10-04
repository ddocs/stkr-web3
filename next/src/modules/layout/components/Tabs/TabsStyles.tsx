import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useTabsStyles = makeStyles<Theme, { count: number }>(theme => ({
  list: {
    display: 'grid',
    gridTemplateColumns: props => `repeat(${props.count}, 1fr)`,

    margin: 0,
    padding: 0,

    border: `1px solid ${fade(theme.palette.text.primary, 0.1)}`,
    borderRadius: 2,

    listStyle: 'none',

    overflow: 'hidden',
  },

  item: {},

  button: {
    display: 'inline-flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    minHeight: 38,

    fontSize: 14,
    lineHeight: 1.2,
    fontWeight: 400,
    fontFamily: 'inherit',
    color: fade(theme.palette.text.primary, 0.5),
    textDecoration: 'none',
  },

  active: {
    color: theme.palette.primary.main,
    boxShadow: `inset 0 0 0 1px ${theme.palette.primary.main}`,
  },
}));
