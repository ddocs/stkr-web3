import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useScrollBarStyles = makeStyles<
  Theme,
  { sideOffset?: number; topOffset?: number }
>(theme => ({
  bar: {
    position: 'relative',
    right: props => `-${props.sideOffset}px`,
    top: props => `${props.topOffset}px`,

    width: 3,
    height: props => `calc(100% - ${props.topOffset}px)`,

    backgroundColor: theme.palette.primary.main,
    borderRadius: 3,
  },

  barTransparent: {
    backgroundColor: 'transparent',
  },
}));
