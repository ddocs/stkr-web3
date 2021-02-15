import { makeStyles } from '@material-ui/core/styles';

export const usePromoStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(7, 0, 6),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(10, 0),
    },

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(12, 0, 10),
    },

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(16, 0, 11),
    },
  },

  wrapper: {
    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },

  title: {
    margin: theme.spacing(0, 0, 2),
    fontSize: 52,
    lineHeight: 1.14,
    fontWeight: 500,

    [theme.breakpoints.up('sm')]: {
      fontSize: 70,
    },

    [theme.breakpoints.up('md')]: {
      fontSize: 80,
      margin: 0,
    },

    [theme.breakpoints.up('lg')]: {
      fontSize: 104,
    },

    [theme.breakpoints.up('xl')]: {
      fontSize: 110,
    },

    '& span': {
      display: 'flex',
      flexDirection: 'column',
    },

    '& span span': {
      color: theme.palette.primary.main,
    },
  },

  text: {
    fontSize: 16,
    lineHeight: 1.48,

    [theme.breakpoints.up('md')]: {
      fontSize: 18,
      placeSelf: 'flex-end',
    },

    [theme.breakpoints.up('lg')]: {
      fontSize: 21,
      lineHeight: 1.6,
      marginBottom: 14,
    },
  },

  button: {
    justifySelf: 'flex-start',
    minWidth: 230,
    marginTop: theme.spacing(3.5),

    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));
