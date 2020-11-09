import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useMarketingStyles = makeStyles<Theme>(theme => ({
  component: {},
  wrapper: {
    '&&': {
      padding: theme.spacing(0, 8.5),
      [theme.breakpoints.down('lg')]: {
        padding: theme.spacing(0, 5),
      },
      [theme.breakpoints.down('md')]: {
        padding: 0,
      },
    },
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(9, 1fr)',
    gridTemplateRows: '1fr auto',
    gridRowGap: theme.spacing(1.5),
    padding: theme.spacing(8, 6.5, 6),
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(8, 5, 6),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(6, 5, 5),
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '100%',
      gridRowGap: theme.spacing(7),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(6, 3, 5),
    },
  },
  title: {
    gridColumn: '1/5',
    gridRow: '1/2',
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      gridColumn: '1/-1',
    },
  },
  linkRoot: {
    '&, &:hover': {
      color: theme.palette.common.black,
    },
  },
  text: {
    gridColumn: '6/10',
    gridRow: '2/3',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      gridColumn: '1/-1',
      justifyContent: 'flex-start',
    },
  },
  link: {
    marginLeft: theme.spacing(2),
  },
}));
