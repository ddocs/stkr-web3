import { makeStyles, Theme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core';

export const useStakerDashboardStakingLabelStyles = makeStyles<Theme>(
  theme => ({
    buttonGroup: {
      justifySelf: 'end',
      boxSizing: 'border-box',
      borderRadius: 25,
      marginLeft: theme.spacing(3),
      [theme.breakpoints.down('md')]: {
        justifySelf: 'auto',
        marginLeft: 0,
      },
    },

    pending: {
      pointerEvents: 'none',
      color: theme.palette.common.white,
      padding: '8px 16px',
      fontSize: 16,
      fontWeight: 500,
      height: 32,
      whiteSpace: 'nowrap',
    },
    pendingIcon: {
      marginRight: theme.spacing(1),
      animationName: '$spin',
      animationDuration: '1s',
      animationDelay: '0s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      willChange: 'transform',
    },
    '@keyframes spin': {
      '100%': { transform: 'rotate(360deg)' },
    },
    unstake: {
      color: fade(theme.palette.common.white, 0.5),
      padding: '8px 16px 8px 10px',
      fontSize: 16,
      fontWeight: 500,
      height: 32,
    },
  }),
);
