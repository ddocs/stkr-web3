import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStakerDashboardStyles = makeStyles<Theme>(theme => ({
  root: {
    paddingTop: theme.spacing(7.5),
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.36fr',
    gridTemplateRows: 'minmax(260px, auto) 1fr',
    gridRowGap: theme.spacing(6),
    gridColumnGap: theme.spacing(5.5),
  },
  stakedContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    padding: theme.spacing(5, 6.5, 3.5),
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 3',
    },
  },
  earningContent: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    padding: theme.spacing(5, 6.5, 3.5),
    gridGap: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 3',
      gridTemplateColumns: '1fr',
    },
  },
  amount: {
    fontSize: 52,
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    '& .unit': {
      fontSize: 16,
    },
  },
  history: {
    gridColumn: '1/3',
    gridRow: 2,
    maxHeight: '100%',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
      gridColumn: '-1/1',
      gridRow: 'auto',
    },
  },
  unstakeButton: {
    justifySelf: 'end',
  },
  stake: {
    padding: 23,
    '&, &:hover': {
      background: theme.palette.primary.main,
    },
  },
  noteDivider: {
    height: theme.spacing(4),
  },
  aETHRow: {
    marginTop: 'auto',
    display: 'flex',
    [theme.breakpoints.up('xs')]: {
      justifySelf: 'end',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      justifySelf: 'start',
    },
  },
}));
