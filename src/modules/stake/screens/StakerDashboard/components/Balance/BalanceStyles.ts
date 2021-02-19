import { makeStyles, Theme } from '@material-ui/core/styles';

export const useBalanceStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignContent: 'space-between',
    padding: '35px 45px 30px',
    borderRadius: 65,
    [theme.breakpoints.down('md')]: {
      borderRadius: 32,
      gridColumn: '1/-1',
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 2.5),
    },
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(3),
  },
  icon: {
    marginRight: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  titleContainer: {
    fontSize: 20,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    display: 'flex',
    whiteSpace: 'nowrap',
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 3,
  },
  amount: {
    flex: 1,
    lineHeight: 1,
    fontSize: 52,
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'flex-end',
    '& > span': {
      display: 'flex',
      alignItems: 'baseline',
    },
    '& .unit': {
      paddingLeft: 8,
      fontSize: 16,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 36,
    },
  },
  tooltip: {
    padding: '15px 6px 9px',
  },
}));
