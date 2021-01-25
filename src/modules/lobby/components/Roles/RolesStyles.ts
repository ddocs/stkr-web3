import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core';

export const useRolesStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(15, 0),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(12, 0),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(10, 0),
    },
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    margin: 0,
    fontSize: 72,
    lineHeight: 1.2,
    [theme.breakpoints.down('md')]: {
      fontSize: 56,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 38,
    },
    '&>span': {
      display: 'flex',
      flexDirection: 'column',
    },
    '& span span': {
      color: theme.palette.primary.main,
    },
  },
  list: {
    margin: 0,
    marginTop: theme.spacing(8),
    padding: 0,
    listStyle: 'none',
    counterReset: 'item',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(5.5),
    },
  },
  item: {
    display: 'grid',
    gridTemplateColumns: 'repeat(9, 1fr)',
    padding: theme.spacing(4, 0, 8),
    boxSizing: 'border-box',
    borderTop: `1px solid ${fade(theme.palette.text.primary, 0.22)}`,
    counterIncrement: 'item',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3.5, 0),
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '100%',
      gridTemplateRows: 'auto auto',
    },
    '&:hover': {
      '& $itemText': {
        opacity: 1,
      },
    },
  },
  itemCaption: {
    gridColumn: '1/4',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '-1/1',
    },
    '&::before': {
      position: 'relative',
      content: '"0"counter(item)',
      marginBottom: theme.spacing(0.5),
      fontSize: 48,
      lineHeight: 1.2,
      [theme.breakpoints.down('xs')]: {
        fontSize: 38,
      },
    },
  },
  itemText: {
    gridColumn: '5/10',
    margin: 0,
    opacity: 0.5,
    transitionTimingFunction: 'linear',
    transitionDuration: '250ms',
    transitionProperty: 'opacity',
    [theme.breakpoints.down('xs')]: {
      gridColumn: '-1/1',
      marginTop: theme.spacing(2.5),
    },
  },
}));
