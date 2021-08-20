import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  container: {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
    left: 0,
    backdropFilter: 'blur(15px)',
    zIndex: 0,
    opacity: 0,
    background: 'rgba(0, 0, 0, 0.01)',
    transition: 'all 250ms linear',
    overflowY: 'auto',
  },
  containerVisible: {
    background: 'rgba(0, 0, 0, 0.7)',
    zIndex: 5,
    opacity: 1,
  },
  containerHideAll: {
    zIndex: 9,
  },
}));
