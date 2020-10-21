import { makeStyles } from '@material-ui/core/styles';

export const useSpinnerStyles = makeStyles(() => ({
  component: {
    animationName: '$spin',
    animationDuration: '1s',
    animationDelay: '0s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
    margin: 'auto',
  },
  '@keyframes spin': {
    '100%': { transform: 'rotate(360deg)' },
  },
}));
