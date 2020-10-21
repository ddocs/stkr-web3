import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useInfoStyles = makeStyles<
  Theme,
  { count: number; small?: boolean }
>(theme => ({
  component: {},

  list: {
    display: 'grid',
    gridTemplateColumns: props => `repeat(${props.count}, 1fr)`,
    gridColumnGap: theme.spacing(4),

    margin: 0,
    padding: 0,

    listStyle: 'none',

    [theme.breakpoints.down('sm')]: {
      '&&': {
        gridTemplateColumns: '100%',
        gridTemplateRows: props => `repeat(${props.count}, auto)`,
        gridColumnGap: 0,
        gridRowGap: theme.spacing(1),
      },
    },
  },

  item: {
    display: 'flex',
    flexDirection: 'column',

    padding: props =>
      !props.small ? theme.spacing(2.5, 4.5, 3) : theme.spacing(2.5, 4.5, 1),

    [theme.breakpoints.down('sm')]: {
      '&&': {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        padding: theme.spacing(2.5, 2),
      },
    },
  },

  label: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },

  value: {
    marginTop: props => (!props.small ? theme.spacing(10) : theme.spacing(0.5)),

    [theme.breakpoints.down('md')]: {
      fontSize: 38,
    },

    [theme.breakpoints.down('sm')]: {
      '&&': {
        marginTop: 0,
      },
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: 22,
    },
  },
}));
