import { makeStyles, Theme } from '@material-ui/core/styles';

export const useDashboardStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(6, 0),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(10, 0),
    },
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    marginBottom: theme.spacing(3),
    maxWidth: 1500,
    width: '100%',
  },

  stats: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: theme.spacing(4, 4),
    marginTop: theme.spacing(6),

    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr',
    },
  },
}));
