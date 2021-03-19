import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStakeDescriptionContainerStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridColumnGap: theme.spacing(4),
    gridRowGap: theme.spacing(7),
    margin: 0,
    marginTop: theme.spacing(8),
    marginBottom: 'auto',
    padding: theme.spacing(0, 20),
    [theme.breakpoints.down('lg')]: {
      gridRowGap: theme.spacing(5.5),
      marginTop: theme.spacing(6),
    },
    [theme.breakpoints.down('md')]: {
      gridRowGap: theme.spacing(3.5),
      marginTop: theme.spacing(4),
      padding: theme.spacing(0, 10),
    },
    [theme.breakpoints.down('sm')]: {
      gridRowGap: theme.spacing(7),
      marginTop: theme.spacing(8),
    },
    [theme.breakpoints.down('xs')]: {
      gridRowGap: theme.spacing(3.5),
      marginTop: theme.spacing(4),
      padding: theme.spacing(0, 2.5),
    },
  },
}));
