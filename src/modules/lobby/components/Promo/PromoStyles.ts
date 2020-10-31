import { makeStyles } from '@material-ui/core/styles';

export const usePromoStyles = makeStyles(theme => ({
  component: {
    padding: theme.spacing(15, 0),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(10, 0),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(8, 0),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(6, 0),
    },
  },
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(9, 1fr)',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '100%',
    },
  },
  title: {
    gridColumn: '1/5',
    margin: 0,
    fontSize: 110,
    lineHeight: 1.14,
    fontWeight: 500,
    [theme.breakpoints.down('md')]: {
      fontSize: 90,
    },
    [theme.breakpoints.down('sm')]: {
      gridColumn: '-1/1',
      fontSize: 70,
      lineHeight: 1.2,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 52,
    },
    '& span': {
      display: 'flex',
      flexDirection: 'column',
    },
    '& span span': {
      color: theme.palette.primary.main,
    },
  },
  text: {
    gridColumn: '6/10',
    margin: 0,
    marginBottom: 14,
    placeSelf: 'flex-end',
    fontSize: 21,
    lineHeight: 1.6,
    [theme.breakpoints.down('md')]: {
      fontSize: 18,
      lineHeight: 1.48,
    },
    [theme.breakpoints.down('sm')]: {
      gridColumn: '-1/1',
      margin: 0,
      marginTop: theme.spacing(0.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
  button: {
    justifySelf: 'flex-start',
    minWidth: 230,
    marginTop: theme.spacing(3.5),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));
