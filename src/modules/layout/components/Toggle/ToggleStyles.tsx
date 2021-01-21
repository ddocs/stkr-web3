import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useToggleStyles = makeStyles<Theme>(theme => ({
  component: {
    display: 'flex',
    flexDirection: 'column',
    width: 32,
    height: 32,
    alignSelf: 'center',

    '& span': {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  componentOpened: {
    '& $top': {
      transform: 'translateY(5px) rotate(45deg)',
    },
    '& $bottom': {
      transform: 'translateY(-5px) rotate(-45deg)',
    },
  },
  line: {
    width: '100%',
    height: 'auto',
    transitionTimingFunction: 'linear',
    transitionDuration: '250ms',
    transitionProperty: 'transform',
    transformOrigin: 'center',
  },
  top: {
    marginBottom: theme.spacing(1),
  },
  bottom: {},
}));
