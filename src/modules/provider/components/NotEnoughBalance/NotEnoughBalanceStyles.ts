import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useEmptyNodeListStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(6, 3),

    [theme.breakpoints.up('sm')]: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: theme.spacing(0, 4),
      padding: theme.spacing(6, 4),
      alignItems: 'center',
    },

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5, 12.5),
      gap: theme.spacing(0, 12.5),
      minHeight: 560,
    },
  },

  img: {
    display: 'block',
    margin: theme.spacing(0, 0, 3),
    fontSize: 140,

    [theme.breakpoints.up('sm')]: {
      margin: 0,
      fontSize: 178,
    },

    '& svg': {
      display: 'block',
      margin: '0 auto',
      width: '1em',
      height: 'auto',
    },
  },

  content: {},

  title: {
    marginBottom: theme.spacing(2.5),
  },

  text: {
    maxWidth: 690,
    marginBottom: theme.spacing(4),
  },

  btn: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: 190,
    },
  },
}));
