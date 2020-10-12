import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStage6Styles = makeStyles<Theme>(theme => ({
  component: {
    position: 'relative',

    padding: theme.spacing(12.5),
  },

  close: {
    position: 'absolute',
    top: theme.spacing(3),
    right: theme.spacing(3),
  },

  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 480px',
    gridRowGap: theme.spacing(20),
  },

  title: {
    margin: 0,

    fontSize: 54,
    lineHeight: 1.2,
    color: theme.palette.primary.main,
  },

  fieldset: {
    display: 'flex',
    flexDirection: 'column',

    paddingRight: theme.spacing(10),
  },

  input: {
    height: 63,
    marginTop: theme.spacing(5),

    '&:first-child': {
      marginTop: 0,
    },
  },

  price: {
    marginTop: theme.spacing(5),

    '& span': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    '& #price': {
      fontSize: 18,
      lineHeight: 1.2,
    },
  },

  balance: {
    position: 'relative',
    gridColumn: '-1/1',

    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gridTemplateRows: 'auto auto',
    gridColumnGap: theme.spacing(5),
    gridRowGap: theme.spacing(3),

    padding: theme.spacing(7.5, 10),

    boxSizing: 'border-box',

    backgroundColor: '#0F0F0F',

    '&::after': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      content: '""',

      display: 'block',
      width: 7,

      backgroundColor: theme.palette.primary.main,
    },
  },

  text: {
    margin: 0,
    maxWidth: 390,
  },

  refill: {
    gridColumn: '2/3',
    gridRow: '-1/1',
  },

  amount: {},

  neededAmount: {
    marginTop: theme.spacing(4.5),
  },

  submit: {
    width: '100%',
    marginTop: theme.spacing(5.5),
  },
}));
