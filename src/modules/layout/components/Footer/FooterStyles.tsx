import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export const useHeaderStyles = makeStyles<Theme>(theme => ({
  component: {
    padding: theme.spacing(8, 0),
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(9, 0),
    },
  },
  componentAuth: {
    padding: theme.spacing(3, 0),
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  copyright: {
    margin: 0,
    fontSize: 12,
    lineHeight: 1.2,
    fontWeight: 400,
    color: theme.palette.text.secondary,
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
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginTop: theme.spacing(2.5),
    },
  },
  item: {
    marginRight: theme.spacing(9),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(9),
    },
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
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginTop: theme.spacing(2.5),
    },
  },
}));
