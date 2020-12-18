import { makeStyles } from '@material-ui/core/styles';

export const useVideoTutorial = makeStyles(() => ({
  root: {
    position: 'relative',
  },
  play: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
  },
}));
