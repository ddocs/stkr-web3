import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    color: '#FFFFFF',
    cursor: 'pointer',
    '&:hover': {
      color: '#E6007A',
    },
    '&:hover svg': {
      fill: '#E6007A !important',
    },
    padding: 20,
    width: 'fit-content',
  },
  text: {
    transition: 'color 200ms',
    fontSize: 60,
    paddingRight: 20,
    lineHeight: 1,
    [theme.breakpoints.down('sm')]: {
      fontSize: 40,
      paddingRight: 15,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 30,
      paddingRight: 5,
    },
  },
  arrow: {
    transition: 'all 200ms',
    display: 'flex',
    fontSize: 60,
    [theme.breakpoints.down('sm')]: {
      fontSize: 40,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 25,
    },
  },
}));
