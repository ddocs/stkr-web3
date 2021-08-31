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

  history: {
    marginTop: theme.spacing(7),
  },

  historyHeader: {
    fontWeight: 500,
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    paddingBottom: theme.spacing(3),
  },

  historyTitle: {
    fontSize: 20,
    lineHeight: '24px',
  },

  historyTotal: {
    fontSize: 18,
    lineHeight: '22px',
  },
}));
