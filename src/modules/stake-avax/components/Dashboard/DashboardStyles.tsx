import { makeStyles, Theme } from '@material-ui/core/styles';

export const useDashboardStyles = makeStyles<Theme>(theme => ({
  root: {
    maxWidth: 1500,
    margin: `${theme.spacing(10)}px auto 0`,
    padding: theme.spacing(0, 15),
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(0, 10),
    },
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    margin: `${theme.spacing(6)}px auto ${theme.spacing(1)}px`,
    width: '100%',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr',
    gap: theme.spacing(4, 4),
    margin: `${theme.spacing(6)}px auto ${theme.spacing(3)}px`,
    [theme.breakpoints.down('md')]: {
      gap: theme.spacing(4, 0),
      gridTemplateColumns: '1fr',
      gridTemplateRows: ' 1fr',
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
    [theme.breakpoints.down('sm')]: {},
  },
  history: {
    width: '100%',
    maxHeight: '100%',
    boxSizing: 'border-box',
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('md')]: {},
  },
  buttonStake: {
    marginLeft: theme.spacing(2.5),
    width: 170,
    height: 44,
    borderRadius: 65,
  },
}));
