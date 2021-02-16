import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useFaqStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(7.5, 0),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(10, 0),
    },

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(12.5, 0),
    },
  },

  wrapper: {
    display: 'grid',
    gridGap: theme.spacing(1.5),

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(9, 1fr)',
    },
  },

  title: {
    margin: 0,

    [theme.breakpoints.up('md')]: {
      gridColumn: '1/4',
      position: 'sticky',
      top: 0,
      alignSelf: 'start',
    },
  },

  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',

    [theme.breakpoints.up('md')]: {
      gridColumn: '4/10',
    },
  },

  item: {
    padding: theme.spacing(1.5, 0),
    border: `solid ${theme.palette.primary.main}`,
    borderWidth: '2px 0 0',

    '&:first-of-type': {
      [theme.breakpoints.down('sm')]: {
        borderTop: 'none',
      },
    },

    '&:last-of-type': {
      [theme.breakpoints.up('md')]: {
        borderWidth: '2px 0',
      },
    },
  },

  question: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    margin: 0,
    minHeight: theme.spacing(7),

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
      color: 'inherit',
    },
  },

  arrow: {
    flexShrink: 0,
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    marginLeft: theme.spacing(1),
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
      margin: theme.spacing(1, 0, 0),
    },

    '& a': {
      color: 'inherit',
      textDecoration: 'underline',
    },
  },
}));
