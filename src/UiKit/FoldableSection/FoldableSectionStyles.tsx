import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useFoldableSectionStyles = makeStyles<
  Theme,
  { duration?: number }
>(() => ({
  foldableSection: {
    overflow: 'hidden',

    transitionDuration: props =>
      props.duration ? `${props.duration}ms` : '300ms',
    transitionProperty: 'height, max-height',
  },

  measureMaxHeight: {
    height: '100% !important',
    maxHeight: '100% !important',
  },

  noAnimation: {
    transitionDuration: '0ms !important',
    transitionProperty: 'none !important',
  },
}));
