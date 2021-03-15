import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useMarketingStyles = makeStyles<Theme>(theme => ({
  placeHolder: {
    position: 'relative',
    minHeight: 100,

    [theme.breakpoints.up('sm')]: {
      minHeight: 200,
    },
  },

  root: {
    padding: theme.spacing(2, 0, 2.5),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 0, 5),
    },
  },

  container: {
    [theme.breakpoints.up('sm')]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },

  header: {
    marginBottom: theme.spacing(2.5),

    [theme.breakpoints.down('xs')]: {
      fontWeight: 500,
    },

    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(1.5),
    },
  },

  cell: {
    borderTop: `1px solid ${fade(theme.palette.common.white, 0.2)}`,
    padding: theme.spacing(2.5, 0),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 0, 1.5),
    },

    '&:first-child': {
      [theme.breakpoints.down('xs')]: {
        borderTop: 'none',
        paddingTop: 0,
      },

      [theme.breakpoints.up('sm')]: {
        borderRight: `1px solid ${fade(theme.palette.common.white, 0.2)}`,
      },
    },

    '&:last-child': {
      [theme.breakpoints.down('xs')]: {
        paddingBottom: 0,
      },

      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(10),
      },
    },
  },

  value: {
    fontSize: 48,
    transition: 'opacity 0.2s',
    opacity: 1,

    [theme.breakpoints.up('sm')]: {
      fontSize: 72,
    },
  },

  valueLoading: {
    transition: 'none',
    opacity: 0,
  },
}));
