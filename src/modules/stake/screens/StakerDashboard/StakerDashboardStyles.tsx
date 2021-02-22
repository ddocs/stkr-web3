import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStakerDashboardStyles = makeStyles<Theme>(theme => ({
  root: {
    paddingTop: theme.spacing(9.125),
    [theme.breakpoints.down('sm')]: {
      paddingTop: 46,
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.down('md')]: {},
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
    marginTop: theme.spacing(6),
    [theme.breakpoints.down('md')]: {},
  },
}));
