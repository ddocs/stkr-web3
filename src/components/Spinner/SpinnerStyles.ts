import { makeStyles } from '@material-ui/core/styles';

export const useSpinnerStyles = makeStyles(() => ({
  component: {
    animationName: '$spin',
    animationDuration: '1s',
    animationDelay: '0s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
    margin: 'auto',
    width: 54,
    height: 54,
    willChange: 'transform',
  },
  '@keyframes spin': {
    '100%': { transform: 'rotate(360deg)' },
  },
  centered: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
}));
