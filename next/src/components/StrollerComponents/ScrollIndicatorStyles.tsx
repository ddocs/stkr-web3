import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useScrollIndicatorStyles = makeStyles<Theme, { offset: number }>(
  theme => ({
    indicator: {
      position: 'absolute',

      display: 'inline-block',

      opacity: 1,

      transitionTimingFunction: 'linear',
      transitionDuration: '200ms',

      transitionProperty: 'opacity',
    },

    indicatorVertical: {
      right: 0,
      left: 0,

      height: 60,
    },

    indicatorHidden: {
      zIndex: -1,

      opacity: 0,
    },

    indicatorTop: {
      top: props => (props.offset ? props.offset : 0),

      backgroundImage:
        'linear-gradient(to top, #0F0F0F 0%, rgba(15, 15, 15, 0) 0.01%, #0F0F0F 100%)',
    },

    indicatorBottom: {
      bottom: 0,

      backgroundImage:
        'linear-gradient(to bottom, #0F0F0F 0%, rgba(15, 15, 15, 0) 0.01%, #0F0F0F 100%)',
    },
  }),
);
