import { makeStyles } from '@material-ui/core/styles';

export const useStakerDasboardStyles = makeStyles(theme => ({
  component: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(9, 0),
    boxSizing: 'border-box',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    width: '100%',
    gridGap: theme.spacing(4.5),
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
}));
