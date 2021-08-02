import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  container: {
    display: 'flex',
    fontSize: 15,
    justifyContent: 'space-between',
    marginTop: 160,
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
      marginTop: 70,
    },
  },
  title: {
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      paddingBottom: 35,
    },
  },
  content: {
    maxWidth: 690,
    width: '66%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));
