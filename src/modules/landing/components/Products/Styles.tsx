import { makeStyles } from '@material-ui/styles';
import {Theme} from "@material-ui/core";

export const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    paddingBottom: 130,
    [theme.breakpoints.down('xs')]: {
      paddingBottom: 87,
    },
  },
  sectionName: {
    fontSize: 15,
    paddingBottom: 30,
    [theme.breakpoints.down('xs')]: {
      paddingBottom: 25,
    },
  },
  title: {
    fontSize: 60,
    paddingBottom: 30,
    [theme.breakpoints.down('sm')]: {
      fontSize: 40,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 30,
      paddingBottom: 25,
    },
  },
  products: {
    width: 'fit-content',
    display: 'flex',
    padding: '0 20px',
    '& > div': {
      marginRight: 4,

      '&:last-child': {
        marginRight: 0,
      }
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
  button: {
    textAlign: 'right',
    justifyContent: 'flex-end',
    marginTop: 50,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      marginRight: 60,
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: 10,
      marginRight: 35,
    },
  }
}));
