import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  content: {
    position: 'absolute',
    bottom: -5,
    left: 15,
    [theme.breakpoints.down('sm')]: {
      bottom: 5,
    },
    [theme.breakpoints.down('xs')]: {
      left: 10,
      bottom: 5,
    },
  },
  menuItem: {
    fontSize: 160,
    lineHeight: '85%',
    transition: 'color 200ms',
    cursor: 'pointer',
    width: 'fit-content',
    paddingRight: 30,

    '& > a': {
      textDecoration: 'none',
      color: 'inherit',
    },

    '&:hover': {
      color: '#E6007A',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 105,
    },
    [theme.breakpoints.down('xs')]: {
      lineHeight: '85%',
      fontSize: 75,
    },
  },
  social: {
    display: 'flex',
    position: 'absolute',
    bottom: 20,
    right: 20,
    '& a': {
      textDecoration: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      bottom: 13,
      right: 13,
    },
  },
  socialLink: {
    marginRight: 48,
    transition: 'color 200ms',
    '&:hover': {
      color: '#E6007A',
    },
    '&:last-child': {
      marginRight: 0,
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: 20,
    },
  },
}));
