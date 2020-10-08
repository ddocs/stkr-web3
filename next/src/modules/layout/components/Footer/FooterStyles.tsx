import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export const useHeaderStyles = makeStyles<Theme>(theme => ({
  component: {
    padding: theme.spacing(13, 0),
    boxSizing: 'border-box',
  },

  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  copyright: {
    '&&': {
      fontWeight: 500,
    },

    '& a': {
      color: 'inherit',
      textDecoration: 'none',
    },

    '& a:hover, a:focus': {
      color: theme.palette.text.primary,
    },
  },

  list: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',

    margin: 0,
    marginLeft: 'auto',
    padding: 0,

    listStyle: 'none',
  },

  item: {
    marginRight: theme.spacing(9),

    '&:last-child': {
      marginRight: 0,
    },
  },

  link: {},

  active: {
    color: theme.palette.primary.main,
    pointerEvents: 'none',
  },

  social: {
    marginLeft: theme.spacing(18),
  },
}));
