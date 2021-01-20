import { makeStyles } from '@material-ui/core/styles';

export const useVideoTutorialStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },

  container: {
    position: 'relative',
  },
}));
