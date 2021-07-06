import { makeStyles, Theme } from '@material-ui/core/styles';

export const useDashboardStyles = makeStyles<Theme>(theme => ({
  root: {
    marginTop: theme.spacing(10),
    padding: theme.spacing(0, 15),
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(0, 10),
    },
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    margin: `${theme.spacing(6)}px auto ${theme.spacing(3)}px`,
    maxWidth: 1500,
    width: '100%',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr',
    gap: theme.spacing(4, 4),
    margin: `${theme.spacing(6)}px auto ${theme.spacing(3)}px`,
    maxWidth: 1500,
    [theme.breakpoints.down('md')]: {
      gap: theme.spacing(4, 0),
      gridTemplateColumns: '1fr',
      gridTemplateRows: ' 1fr',
    },
  },
  buttonStake: {
    marginLeft: theme.spacing(2.5),
    width: 170,
    height: 44,
    borderRadius: 65,
  },
}));
