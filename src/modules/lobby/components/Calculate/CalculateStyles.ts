import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useCalculateStyles = makeStyles<Theme>(theme => ({
  component: {},
  note: {
    marginTop: theme.spacing(4),
    maxWidth: 305,
    opacity: 0.5,
  },
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
    padding: theme.spacing(15, 6.5, 12.5),
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(15, 5, 12.5),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(10, 5, 8),
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '100%',
      gridRowGap: theme.spacing(7.5),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(4.5, 3),
    },
  },
  title: {
    gridColumn: '1/5',
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      gridColumn: '-1/1',
    },
    '& br': {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  },
  form: {
    gridColumn: '5/10',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'auto auto auto',
    gridRowGap: theme.spacing(4.5),

    [theme.breakpoints.down('sm')]: {
      gridColumn: '-1/1',
      gridTemplateColumns: 'repeat(9, 1fr)',
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '100%',
      gridTemplateRows: 'auto auto auto auto',
      gridRowGap: theme.spacing(2.5),
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
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
    },
  },
}));
