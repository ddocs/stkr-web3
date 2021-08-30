import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  networkCard: {
    width: 228,
    height: 240,
    background: '#191919',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'white',
    padding: 20,
    userSelect: 'none',
    margin: '0 4px 4px 0',

    '&:hover': {
      background: '#333333',
    },

    [theme.breakpoints.down('sm')]: {
      width: 237,
      height: 237,
    },
    [theme.breakpoints.down('xs')]: {
      width: 160,
      height: 172,
      padding: 15,
    },
  },
  networkCardDisabled: {
    '& div': {
      opacity: 0.5,
    },
    cursor: 'default',
    pointerEvents: 'none',
  },
  logo: {
    width: 50,
    height: 50,
    [theme.breakpoints.down('xs')]: {
      fontSize: 30,
    },
  },
  title: {
    fontSize: 40,
    lineHeight: 1,
    paddingTop: 11,

    [theme.breakpoints.down('xs')]: {
      paddingTop: 6,
      fontSize: 30,
    },
  },
  description: {
    fontSize: 15,
    lineHeight: 1.2,
    paddingTop: 10,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 0,
    },
  },
}));
