import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useCreateNodeStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(5, 0),
  },

  paper: {
    maxWidth: 560,
    margin: '0 auto',

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(4, 2, 6.5),
    },
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
  },

  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 24,
      flexGrow: 1,
    },

    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(6),
    },
  },

  space: {
    '&&': {
      marginBottom: theme.spacing(6.5),
    },
  },

  note: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary,

    '& a': {
      textDecoration: 'underline',
      color: 'inherit',
      transition: 'color 0.2s',

      '&:hover': {
        color: theme.palette.text.primary,
      },
    },
  },

  cancel: {
    padding: 0,
    margin: theme.spacing(0.5, 0, 0, 1.5),

    [theme.breakpoints.up('sm')]: {
      margin: 0,
    },
  },

  question: {
    padding: theme.spacing(1),
  },
}));
