import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export const useStayTunedStyles = makeStyles<Theme>(theme => ({
  component: {},

  wrapper: {},

  title: {},

  content: {
    display: 'grid',
    gridGap: theme.spacing(4.5),
    gridTemplateColumns: '1fr 1.2fr',
    gridTemplateRows: 'auto auto',

    margin: 0,
    marginTop: theme.spacing(9),
    padding: 0,

    listStyle: 'none',

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '100%',
      gridTemplateRows: 'auto auto auto',
      gridRowGap: theme.spacing(1),

      marginTop: theme.spacing(4.5),
    },
  },

  newsItem: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.4fr',
    gridTemplateRows: 'auto auto',
    gridColumnGap: theme.spacing(3),
    gridRowGap: theme.spacing(2.5),

    padding: theme.spacing(5, 0),

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 3fr',
      gridColumnGap: theme.spacing(1.5),
      gridRowGap: theme.spacing(1.5),

      padding: theme.spacing(3, 0),
    },

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr 2fr',
    },
  },

  mainNewsItem: {
    [theme.breakpoints.up('md')]: {
      gridColumn: '1/2',
      gridRow: '-1/1',

      gridTemplateColumns: '100%',
      gridTemplateRows: '1fr auto auto',
      justifyItems: 'center',

      padding: theme.spacing(0, 5, 8),
    },
  },

  newsImage: {
    gridColumn: '1/2',
    gridRow: '-1/1',
    placeSelf: 'center',

    width: 156,
    height: 'auto',

    [theme.breakpoints.down('sm')]: {
      width: 78,
    },
  },

  mainNewsImage: {
    [theme.breakpoints.up('md')]: {
      gridColumn: 'auto',
      gridRow: 'auto',

      width: 206,
    },
  },

  newsHeader: {
    alignSelf: 'flex-end',

    paddingRight: theme.spacing(5),

    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(3),
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },

  mainNewsHeader: {
    [theme.breakpoints.up('md')]: {
      maxWidth: 450,
      marginBottom: theme.spacing(2),
      paddingRight: 0,

      fontSize: 28,
      textAlign: 'center',
    },
  },

  newsText: {
    paddingRight: theme.spacing(5),

    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(3),
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: 10,
    },
  },

  mainNewsText: {
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },
}));
