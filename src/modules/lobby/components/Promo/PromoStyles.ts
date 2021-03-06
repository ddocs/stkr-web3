import { makeStyles } from '@material-ui/core/styles';

export const usePromoStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1, 0, 0),

    [theme.breakpoints.up('xs')]: {
      marginBottom: theme.spacing(3),
    },

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 0),
      marginBottom: theme.spacing(0),
    },

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(12, 0, 0),
    },

    [theme.breakpoints.up('lg')]: {
      marginBottom: 65,
    },

    [theme.breakpoints.up('xl')]: {
      padding: '188px 0 0',
      marginBottom: 170,
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
    fontWeight: 'bold',

    '& span': {
      display: 'flex',
      flexDirection: 'column',
    },

    '& span span': {
      color: theme.palette.primary.main,
    },

    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      fontSize: 52,
      lineHeight: '120%',
    },
    [theme.breakpoints.down('xs')]: {
      fontWeight: 500,
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
