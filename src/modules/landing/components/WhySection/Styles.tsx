import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  container: {
    fontSize: 15,
    display: 'flex',
    justifyContent: 'space-between',
    lineHeight: '120%',
    paddingBottom: 160,
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 150,
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: 100,
      flexDirection: 'column',
    },
  },
  table: {
    borderCollapse: 'collapse',
    maxWidth: 950,
    minWidth: 285,
    width: '100%',
  },
  tableKey: {
    fontWeight: 'bold',
    padding: '20px 0 20px 0',
    width: '49%',
    [theme.breakpoints.down('xs')]: {
      width: 100,
    },
  },
  tableValue: {
    padding: 20,
    width: '49%',
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
      paddingRight: 0,
    },
  },
  tableRow: {
    borderBottom: '1px solid #ffffff',
    verticalAlign: 'top',

    '&:first-child td': {
      borderBottom: 'none',
      paddingTop: 0,
    },
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  title: {
    fontWeight: 'bold',
    paddingRight: 160,
    width: 280,
    [theme.breakpoints.down('xs')]: {
      paddingBottom: 45,
    },
  },
}));
