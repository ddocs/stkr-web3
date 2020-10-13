import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useDropdownStyles = makeStyles<Theme>(theme => ({
  component: {
    minWidth: 320,

    opacity: 0,

    transitionTimingFunction: 'linear',
    transitionDuration: '300ms',
    transitionProperty: 'opacity',

    pointerEvents: 'none',
  },

  visible: {
    opacity: 1,

    pointerEvents: 'initial',
  },
}));
