import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useCalculateStyles = makeStyles<Theme>(theme => ({
  component: {},
  title: {
    marginBottom: theme.spacing(9),
    '& span span': {
      color: theme.palette.primary.main,
    },
  },
  curtains: {
    '&&': {
      maxWidth: 1048,
    },
  },

  form: {
    padding: theme.spacing(12, 13, 8.5, 13),
    boxSizing: 'border-box',
  },

  label: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ethPrice: {
    fontSize: 34,
    fontWeight: 700,
  },
  usdPrice: {
    fontSize: 20,
    fontWeight: 400,
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(1),
  },

  range: {
    marginBottom: theme.spacing(5),
  },

  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(auto, 260px))',
    justifyContent: 'space-between',
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },

  item: {
    marginBottom: theme.spacing(8.5),
  },

  caption: {
    marginBottom: theme.spacing(2),
  },

  value: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  earningValue: {
    fontSize: 27,
    fontWeight: 700,
  },

  divider: {
    height: 26,
  },

  earningConvertedValue: {
    fontSize: 24,
    fontWeight: 400,
  },

  unlock: {
    minWidth: 648,
    height: 60,
    placeSelf: 'center',
  },
}));
