import { makeStyles } from '@material-ui/core/styles';

export const useVideoTutorialStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 0, 8),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 0, 12),
    },

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(5, 0, 17),
    },
  },

  container: {
    position: 'relative',
  },
}));
