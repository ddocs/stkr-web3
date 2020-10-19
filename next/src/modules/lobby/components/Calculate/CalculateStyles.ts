import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useCalculateStyles = makeStyles<Theme>(theme => ({
  component: {},
  title: {
    margin: 0,
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
    marginTop: theme.spacing(9),
    padding: theme.spacing(12, 13, 8.5, 13),
    boxSizing: 'border-box',

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4),
    },

    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(5),
    },
  },

  label: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridTemplateRows: 'auto auto',
    gridTemplateAreas: '"label ethPrice" "usdPrice usdPrice"',

    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: 'auto 1fr',
      gridTemplateRows: 'auto auto',
      gridTemplateAreas: '"label label" "ethPrice usdPrice"',
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(4),
    },
  },

  captionPrice: {
    gridArea: 'label',
  },

  ethPrice: {
    gridArea: 'ethPrice',
    fontSize: 34,
    fontWeight: 700,

    [theme.breakpoints.down('sm')]: {
      fontSize: 28,
    },
  },

  usdPrice: {
    gridArea: 'usdPrice',
    justifySelf: 'flex-end',
    alignSelf: 'center',

    fontSize: 20,
    fontWeight: 400,

    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },

    [theme.breakpoints.down('xs')]: {
      justifySelf: 'flex-start',
    },
  },

  range: {
    marginTop: theme.spacing(1),

    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(3.5),
    },
  },

  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(auto, 260px))',
    justifyContent: 'space-between',
    margin: 0,
    marginTop: theme.spacing(5),
    padding: 0,
    listStyle: 'none',

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '100%',
      gridTemplateRows: 'repeat(2, auto)',
      gridRowGap: theme.spacing(4.5),
    },
  },

  item: {},

  caption: {},

  value: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginTop: theme.spacing(2),
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
    placeSelf: 'center',

    width: '100%',
    height: 60,
    marginTop: theme.spacing(8),

    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(6),
    },
  },
}));
