import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  container: {
    background: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
    padding: '20px 20px 8px',
    width: 464,
    cursor: 'pointer',
    transition: 'background 250ms ease-out',
    [theme.breakpoints.down('xs')]: {
      width: 225,
    },
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      flex: 1,
    },
  },
  time: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: '12px 20px 10px 20px',
    position: 'absolute',
    top: 20,
    right: 20,
    [theme.breakpoints.down('xs')]: {
      padding: '7px 20px 5px 20px',
      top: 15,
      right: 15,
    },
  },
  title: {
    fontSize: 60,
    lineHeight: 1,
    [theme.breakpoints.down('md')]: {
      minHeight: 110,
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: 80,
      fontSize: 40,
    },
    [theme.breakpoints.down('xs')]: {
      minHeight: 30,
      fontSize: 30,
    },
  },
  description: {
    fontSize: 15,
    lineHeight: 1.2,
    paddingTop: 20,
    color: 'rgba(255, 255, 255, 0.5)',
    height: 20 + 21 * 4,
    [theme.breakpoints.down('sm')]: {
      height: 20 + 21 * 5,
    },
    [theme.breakpoints.down('xs')]: {
      height: 20 + 21 * 5,
    },
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 30,
    [theme.breakpoints.down('xs')]: {
      width: 50,
      height: 50,
      marginBottom: 15,
    },
  },
  infoContainer: {
    opacity: 1,
    transition: 'opacity 200ms linear',
  },
  infoContainerHidden: {
    opacity: 0,
  },
  info: {
    paddingTop: 18,
    fontSize: 15,
    display: 'flex',
    flexWrap: 'wrap',
  },
  infoTitle: {
    color: 'rgba(255, 255, 255, 0.5)',
    lineHeight: '120%',
  },
  infoValue: {
    lineHeight: '17px',
    '& > span': {
      color: 'rgba(255, 255, 255, 0.5)',
    },
  },
  infoItem: {
    width: 182,
    marginBottom: 25,
    marginRight: 20,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 20,
    },
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
    paddingBottom: 12,
  },
}));
