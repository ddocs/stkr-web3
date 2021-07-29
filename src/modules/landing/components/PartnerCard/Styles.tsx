import { makeStyles } from '@material-ui/styles';
import {Theme} from "@material-ui/core";

export const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    background: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
    padding: 20,
    width: 464,
    cursor: 'pointer',
    transition: 'background 250ms ease-out',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      flex: 1,
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    width: 36,
    height: 36,
  },
  title: {
    fontSize: 30,
    lineHeight: 1.2,
    padding: '10px 0 0 10px',
    [theme.breakpoints.down('xs')]: {
      fontSize: 20,
    },
  },
  advantagesContainer: {
    position: 'absolute',
    bottom: 20,
    opacity: 1,
    transition: 'opacity 200ms linear',
  },
  advantagesContainerHidden: {
    opacity: 0,
  },
  advantageItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    fontSize: 20,
    '&:last-child': {
      marginBottom: 0,
    }
  },
  advantageText: {
    fontSize: 15,
    marginLeft: 15,
    lineHeight: 1,
  },
  soon: {
    fontSize: 15,
    marginLeft: 8,
    color: 'rgba(255, 255, 255, 0.5)',
    lineHeight: 1,
  },
  focusedButton: {
    height: 0,
    width: '100%',
    position: 'absolute',
    bottom: -15,
    left: 0,
    background: '#ffffff',
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'height 250ms ease-out, color 500ms ease-in',
  },
  focusedButtonVisible: {
    color: '#E6007A',
    height: '49%',
  },
  focusedMobileButton: {
    color: '#E6007A',
    fontSize: 18,
    fontWeight: 600,
    paddingTop: 30,
  }
}));
