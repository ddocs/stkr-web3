import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useFaqStyles = makeStyles<Theme>(theme => ({
  component: {
    padding: theme.spacing(12.5, 0),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(10, 0),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(7.5, 0),
    },
  },
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(9, 1fr)',
    gridGap: theme.spacing(1.5),
  },
  title: {
    gridColumn: '1/4',
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      gridColumn: '1/-1',
    },
  },
  list: {
    gridColumn: '4/10',
    margin: 0,
    padding: 0,
    listStyle: 'none',
    [theme.breakpoints.down('sm')]: {
      gridColumn: '1/-1',
    },
  },
  item: {
    padding: theme.spacing(3, 0, 6),
    borderTop: `2px solid ${theme.palette.primary.main}`,
  },
  question: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    margin: 0,
    '& button': {
      padding: 0,
      margin: 0,
      fontSize: 18,
      lineHeight: 1.48,
      fontWeight: 700,
      textAlign: 'left',
      border: 0,
      backgroundColor: 'transparent',
      cursor: 'pointer',
    },
  },
  arrow: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    cursor: 'pointer',
    transitionTimingFunction: 'linear',
    transitionDuration: '250ms',
    transitionProperty: 'transform',
  },
  rotate: {
    transform: 'rotate(90deg)',
    transformOrigin: 'center',
  },
  answer: {
    '& p': {
      margin: 0,
      marginTop: theme.spacing(3),
    },
  },
}));
