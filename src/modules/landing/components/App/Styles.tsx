import { makeStyles } from '@material-ui/styles';
import {Theme} from "@material-ui/core";

export const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    background: 'black',
    position: 'relative',
    minHeight: '100vh',
    padding: 20,
    color: '#FFFFFF',
    fontFamily: 'TT Commons',
    letterSpacing: '-0.02em',
    overflowX: 'hidden',
    '& a': {
      textDecoration: 'underline',
      color: 'inherit',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '15px 15px 0',
    },
    '& div::selection, & span::selection, & a::selection, & td::selection, & img::selection': {
      background: '#E6007A',
      color: '#000000',
    },
  },
  containerWithMenu: {
    overflowY: "hidden",
    height: '100vh',
  },
  launchButton: {
    position: "absolute",
    zIndex: 6,
    top: 90,
    right: 170,

    [theme.breakpoints.down('sm')]: {
      right: 30,
    },
    [theme.breakpoints.down('xs')]: {
      right: 20,
    }
  },
  launchButtonText: {
    fontSize: 60,
    fontWeight: 400,
    [theme.breakpoints.down('sm')]: {
      fontSize: 40,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 30,
    }
  },
  bgVideo: {
    zIndex: 0,
    position: 'absolute',
    top: 0,
    left: 0,
  }
}));
