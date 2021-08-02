import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  container: {
    borderBottom: '1px solid white',
    '&:first-child > div': {
      paddingTop: 0,
    },
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    cursor: 'pointer',
    lineHeight: 1,
  },
  arrow: {
    fontSize: 18,
    transition: 'transform 250ms linear',
    marginLeft: 20,
  },
  arrowDown: {
    transform: 'rotate(90deg)',
  },
  content: {
    height: 0,
    visibility: 'hidden',
    opacity: 0,
    transition: 'height 250ms linear',
  },
  contentOpened: {
    height: 'auto',
    visibility: 'visible',
    opacity: 1,
  },
  answer: {
    paddingBottom: 20,
    lineHeight: 1.2,
  },
}));
