import { Theme } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

export const useCalculateStyles = makeStyles<Theme>(theme => ({
  wrapper: {},

  content: {
    display: 'grid',
    padding: theme.spacing(4.5, 3),
    gridRowGap: theme.spacing(7.5),
    borderRadius: 63,
    border: `1px solid ${fade(theme.palette.common.white, 0.2)}`,

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(12, 1fr)',
      padding: theme.spacing(10, 5, 8),
      gridRowGap: 0,
    },

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(16, 8, 12.5),
    },
  },

  title: {
    margin: 0,

    [theme.breakpoints.up('md')]: {
      gridColumn: '1/5',
    },

    [theme.breakpoints.up('lg')]: {
      margin: theme.spacing(1, 0, 0),
    },

    '& br': {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  },

  form: {
    display: 'grid',
    gridRowGap: theme.spacing(4),

    [theme.breakpoints.up('sm')]: {
      gridRowGap: theme.spacing(4.5),
      gridTemplateColumns: 'repeat(9, 1fr)',
    },

    [theme.breakpoints.up('md')]: {
      gridColumn: '6/13',
      gridRowGap: theme.spacing(6),
      gridTemplateColumns: 'repeat(5, 1fr)',
    },

    [theme.breakpoints.up('lg')]: {
      gridColumn: '7/13',
    },
  },

  range: {
    gridColumn: '-1/1',

    [theme.breakpoints.down('xs')]: {
      gridRow: '2/3',
    },
  },

  item: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto auto auto',
    gridTemplateAreas: '"caption" "value" "converted-value"',

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: 'auto 1fr',
      gridTemplateRows: 'auto auto',
      gridTemplateAreas: '"caption caption" "value converted-value"',
    },

    '&:nth-of-type(2n+1)': {
      gridColumn: '1/3',

      [theme.breakpoints.down('sm')]: {
        gridColumn: '1/5',
      },

      [theme.breakpoints.down('xs')]: {
        gridColumn: '-1/1',
      },
    },

    '&:nth-of-type(2n+2)': {
      gridColumn: '4/6',

      [theme.breakpoints.down('sm')]: {
        gridColumn: '6/10',
      },

      [theme.breakpoints.down('xs')]: {
        gridColumn: '-1/1',
      },
    },
  },

  itemCaption: {
    gridArea: 'caption',
    marginBottom: theme.spacing(1.5),
    opacity: 0.5,

    [theme.breakpoints.down('xs')]: {
      opacity: 1,
    },
  },

  itemValue: {
    gridArea: 'value',
    fontSize: 40,
    lineHeight: 1.3,
    fontWeight: 700,

    [theme.breakpoints.down('xs')]: {
      fontSize: 28,
      fontWeight: 500,
    },
  },

  itemConvertedValue: {
    gridArea: 'converted-value',
    fontSize: 18,
    lineHeight: 1.3,
    opacity: 0.5,

    [theme.breakpoints.down('xs')]: {
      alignSelf: 'flex-end',
      marginBottom: 4,
      marginLeft: 8,
    },
  },

  unlock: {
    gridColumn: '-1/1',
    height: 60,
  },
}));
