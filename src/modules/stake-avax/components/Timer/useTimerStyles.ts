import { makeStyles, Theme } from '@material-ui/core';

export const useTimerStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'grid',
    alignItems: 'end',
    gridTemplateColumns: 'auto 1fr',
    gap: theme.spacing(0, 1),

    [theme.breakpoints.up('sm')]: {
      display: 'block',
      textAlign: 'right',
    },
  },

  title: {
    fontSize: 13,

    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(0.5),
    },
  },

  timer: { fontWeight: 500 },

  timerSkeleton: {
    display: 'inline-block',
  },
}));
