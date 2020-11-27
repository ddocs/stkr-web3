import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useMarketingStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
    minHeight: 100,
    [theme.breakpoints.up('sm')]: {
      minHeight: 257,
    },
  },
  content: {
    width: '100%',
  },
  header: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(3),
      fontSize: 16,
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(1.5),
    },
  },
  cell: {
    borderTop: `1px solid ${fade(theme.palette.common.white, 0.2)}`,
    '&:first-child': {
      borderRight: `1px solid ${fade(theme.palette.common.white, 0.2)}`,
    },

    '&:nth-child(even)': {
      '& $cellContent': {
        paddingLeft: theme.spacing(1.5),
        [theme.breakpoints.up('sm')]: {
          paddingLeft: theme.spacing(9),
        },
      },
    },
  },
  cellContent: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(1),
    },
  },
  value: {
    fontSize: 72,
    [theme.breakpoints.down('xs')]: {
      fontSize: 32,
    },
  },
}));
