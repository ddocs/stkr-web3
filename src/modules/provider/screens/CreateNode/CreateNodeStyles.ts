import { fade, makeStyles } from '@material-ui/core/styles';

export const useCreateNodeStyles = makeStyles(theme => ({
  root: {
    '&&': {
      paddingTop: theme.spacing(9),
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginBottom: theme.spacing(6),
  },
  space: {
    '&&': {
      marginBottom: theme.spacing(6.5),
    },
  },
  note: {
    marginTop: theme.spacing(1.5),
    '&, & a': {
      color: fade(theme.palette.common.white, 0.5),
    },
    '& a:hover': {
      color: theme.palette.primary.main,
    },
  },
  cancel: {
    position: 'absolute',
    right: theme.spacing(5),
    top: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      right: theme.spacing(2),
    },
  },
}));
