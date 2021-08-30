import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '0 10px',
    [theme.breakpoints.down('sm')]: {
      height: 'fit-content',
      padding: '100px 10px',
    },
    [theme.breakpoints.down('xs')]: {
      height: 'fit-content',
      padding: '100px 10px 0',
    },
  },
  content: {
    width: 930,
    [theme.breakpoints.down('sm')]: {
      width: 518,
    },
  },
  close: {
    position: 'absolute',
    top: 15,
    right: 15,
    fontSize: 15,
    lineHeight: 1,
    padding: 5,
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      top: 20,
      right: 10,
    },
  },
  title: {
    fontSize: 160,
    lineHeight: 0.9,
    paddingBottom: 20,
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 10,
      paddingLeft: 12,
      fontSize: 98,
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      fontSize: 70,
    },
  },
  cards: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
