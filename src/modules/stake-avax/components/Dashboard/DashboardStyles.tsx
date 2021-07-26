import { makeStyles, Theme } from '@material-ui/core/styles';

export const useDashboardStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(6, 0),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(10, 0),
    },
  },

  header: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      alignItems: 'center',
    },
  },

  stats: {
    display: 'grid',
    gap: theme.spacing(4, 4),

    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },

  content: {
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.down('sm')]: {
      padding: '0 16px !important',
    },
  },

  boxes: {
    marginTop: theme.spacing(4.5),
    display: 'grid',
    gridTemplateRows: 'minmax(206px, auto)',
    gridRowGap: theme.spacing(6),
    gridColumnGap: theme.spacing(3),

    [theme.breakpoints.down('md')]: {
      gridRowGap: theme.spacing(4.5),
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(3),
    },
  },

  title: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    fontSize: 28,
    fontWeight: 'bold',
  },

  history: {
    width: '100%',
    maxHeight: '100%',
    boxSizing: 'border-box',
    marginTop: theme.spacing(2),
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

  apyValue: {
    fontSize: 13,
  },

  timerCol: {
    [theme.breakpoints.up('sm')]: {
      order: 1,
    },
  },
}));
