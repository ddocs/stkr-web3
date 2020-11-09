import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStakerDasboardStyles = makeStyles<Theme>(theme => ({
  component: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
    margin: 'auto',
  },
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    width: '100%',
    gridGap: theme.spacing(4.5),
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  content: {
    padding: theme.spacing(5),
    display: 'grid',
    gridTemplateColumns: '1fr minmax(0, 138px)',
    width: '100%',
    position: 'relative',
    zIndex: theme.zIndex.tooltip,
  },
  half: {
    minHeight: '50%',
    '&:first-child': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
  },
  headline: {
    fontSize: 20,
    gridColumn: 1,
    gridRow: 1,
    '& + *': {
      gridColumn: 2,
      gridRow: 1,
    },
    '& + * + *': {
      gridColumn: '1 / span 2',
    },
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  staked: {
    gridColumn: 1,
    gridRow: 1,
    padding: theme.spacing(2.5, 4),
    gridGap: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: '1fr minmax(0, 160px)',
  },
  stakedTitle: {
    gridColumn: '1 / span 2',
    marginBottom: theme.spacing(5),
  },
  stakedAmount: {
    gridColumn: 1,
    gridRow: 2,
  },
  stakedButton: {
    gridColumn: 2,
    gridRow: 2,
  },
  reward: {
    gridColumn: 2,
    gridRow: 1,
    padding: theme.spacing(2.5, 4),
  },
  rewardTitle: {
    marginBottom: theme.spacing(7),
  },
  history: {
    gridColumn: '1 / span 2',
    gridRow: 2,
  },
  table: {
    '&&': {
      minWidth: 'unset',
    },
  },
}));
