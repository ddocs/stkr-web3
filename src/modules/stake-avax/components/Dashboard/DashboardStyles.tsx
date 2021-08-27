import { makeStyles, Theme } from '@material-ui/core/styles';

export const useDashboardStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(6, 0),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(10, 0),
    },
  },

  stats: {
    display: 'grid',
    gap: theme.spacing(4, 4),

    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },

  buttonStake: {
    minWidth: 170,
  },

  buttonStakeSkeleton: {
    borderRadius: 48,
    height: 48,
  },

  apyCol: {
    marginTop: theme.spacing(-2),

    [theme.breakpoints.up('sm')]: {
      order: 2,
      alignSelf: 'stretch',
      marginTop: theme.spacing(-3),
    },
  },

  timerCol: {
    [theme.breakpoints.up('sm')]: {
      order: 1,
    },
  },
}));
