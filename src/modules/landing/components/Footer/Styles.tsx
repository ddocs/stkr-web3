import { makeStyles } from '@material-ui/styles';
import {Theme} from "@material-ui/core";

export const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    display: 'flex',
    color: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 15,
    lineHeight: '18px',
    marginTop: 150,

    '& a': {
      color: "white",
      textDecoration: 'none !important',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: 96,
      flexWrap: 'wrap',
    },
  },
  rights: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginBottom: 15,
    },
  },
  whitepapers: {
    display: 'flex',
    marginRight: 145,
    [theme.breakpoints.down('md')]: {
      marginRight: 30,
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: 20,
      marginBottom: 10,
    },
  },
  whitepaper: {
    marginRight: 48,
    transition: 'color 200ms',
    '&:hover': {
      color: '#E6007A',
    },
    '&:last-child': {
      marginRight: 0,
    },
    [theme.breakpoints.down('md')]: {
      marginRight: 20,
    },
  },
  social: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      marginBottom: 10,
    },
  },
  socialLink: {
    marginRight: 36,
    padding: 6,
    transition: 'color 200ms',
    '&:hover': {
      color: '#E6007A',
    },
    '&:last-child': {
      marginRight: 0,
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: 16,
      padding: 2,
    },
  },
}));
