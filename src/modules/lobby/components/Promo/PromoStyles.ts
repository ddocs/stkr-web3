import { makeStyles } from '@material-ui/core/styles';

export const usePromoStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(7, 0, 6),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 0),
    },

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(12, 0, 10),
    },

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(16, 0, 11),
    },
  },

  wrapper: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column-reverse',
    },
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  title: {
    margin: theme.spacing(0, 0, 2),
    fontSize: 64,
    lineHeight: 1.14,
    fontWeight: 500,

    '& span': {
      display: 'flex',
      flexDirection: 'column',
    },

    '& span span': {
      color: theme.palette.primary.main,
    },

    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
    },
  },

  subtitle: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
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
    margin: theme.spacing(3.5),

    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));
