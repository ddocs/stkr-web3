import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  container: {},
  sectionName: {
    fontSize: 15,
    paddingBottom: 30,
    [theme.breakpoints.down('xs')]: {
      paddingBottom: 20,
    },
  },
  title: {
    fontSize: 200,
    lineHeight: '180px',
    paddingBottom: 20,
    [theme.breakpoints.down('sm')]: {
      fontSize: 105,
      lineHeight: '94px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 75,
      lineHeight: '67px',
      paddingBottom: 15,
    },
  },
  products: {
    width: 'fit-content',
    display: 'flex',
    padding: '0 20px',
    '& > div': {
      marginRight: 4,
      marginBottom: 4,

      '&:last-child': {
        marginRight: 0,
      },
    },
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',

      '& > div': {
        marginRight: 0,
      },
    },
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
  },
  productsContainer: {
    width: 'calc(100% + 35px)',
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollbarWidth: 'none',
    margin: '0 -20px',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));
