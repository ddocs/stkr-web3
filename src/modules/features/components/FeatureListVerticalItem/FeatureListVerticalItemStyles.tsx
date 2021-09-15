import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const useFeaturesListVerticalItemStyles = makeStyles((theme: Theme) => ({
  container: {
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 48,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    width: 380,
    minHeight: 440,
    paddingBottom: theme.spacing(10),
    position: 'relative',
    margin: theme.spacing(2),
    minWidth: 300,
    [theme.breakpoints.down('sm')]: {
      height: 450,
    },
  },
  new: {
    position: 'absolute',
    top: 23,
    right: 23,
  },
  icon: {
    width: 70,
    height: 70,
    marginTop: theme.spacing(3.5),
    [theme.breakpoints.down('sm')]: {
      marginTop: 25,
    },
  },
  title: {
    color: theme.palette.text.primary,
    paddingTop: theme.spacing(2),
  },
  featureItem: {
    padding: theme.spacing(2, 3, 0, 3),
    color: 'rgba(255, 255, 255, 0.5)',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      padding: '14px 22px 0',
    },
  },
  featureItemText: {
    fontSize: 14,
    paddingLeft: theme.spacing(1.25),
  },
  button: {
    background: 'transparent',
    borderRadius: 0,
    position: 'absolute',
    bottom: 0,
    height: theme.spacing(8),
    border: 'none',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',

    '&:before': {
      display: 'none',
    },

    '&:hover': {
      background: theme.palette.primary.main,
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
