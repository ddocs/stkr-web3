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
      gridAutoColumns: '1fr',
      gridAutoFlow: 'column',
    },
  },

  buttonStake: {
    minWidth: 170,
  },

  buttonStakeSkeleton: {
    borderRadius: 48,
    height: 48,
  },
  title: {
    position: 'relative',
  },
  label: {
    position: 'absolute',
    top: 4,
    right: -65,
  },
}));
