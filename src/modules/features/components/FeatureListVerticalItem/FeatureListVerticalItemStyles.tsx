import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

export const useFeaturesListVerticalItemStyles = makeStyles((theme: Theme) => ({
  container: {
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 48,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    width: 380,
    height: 440,
    position: 'relative',
    margin: '16px',
    minWidth: 300,
    [theme.breakpoints.down('sm')]: {
      height: 450,
    },
  },
  new: {
    background: 'rgba(255, 255, 255, 0.18)',
    borderRadius: 30,
    color: '#fff',
    padding: '3px 23px',
    fontSize: 14,
    fontWeight: 500,
    position: 'absolute',
    top: 23,
    right: 23,
  },
  icon: {
    width: 70,
    height: 70,
    marginTop: 28,
    [theme.breakpoints.down('sm')]: {
      marginTop: 25,
    },
  },
  title: {
    color: 'white',
    paddingTop: 14,
  },
  featureItem: {
    padding: '16px 25px 0',
    color: 'rgba(255, 255, 255, 0.5)',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      padding: '14px 22px 0',
    },
  },
  featureItemText: {
    fontSize: 14,
    paddingLeft: 10,
  },
  button: {
    background: 'transparent',
    borderRadius: 0,
    position: 'absolute',
    bottom: 0,
    height: 62,
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',

    '&:hover': {
      background: '#006DFF',
      borderTop: '1px solid rgba(255, 255, 255, 0)',
    },
  },
  buttonText: {
    color: 'white',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '125%',
  },
}));
