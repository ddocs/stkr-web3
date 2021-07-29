import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  container: {
    marginBottom: 160,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 105,
    },
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontSize: 200,
    lineHeight: '180px',
    paddingTop: 35,
    paddingRight: 50,
    maxWidth: 1250,
    '&::selection': {
      background: '#E6007A',
      color: '#000000',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: 800,
      fontSize: 105,
      lineHeight: '94px',
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: 0,
      fontSize: 75,
      lineHeight: '67px',
    },
  },
  descriptionContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  description: {
    width: 190,
    marginRight: 265,
    marginBottom: 30,
    fontSize: 15,
    lineHeight: '120%',
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
    [theme.breakpoints.down('xs')]: {
      width: 153,
      marginRight: 0,
    },
  },
}));
