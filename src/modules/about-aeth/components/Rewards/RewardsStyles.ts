import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useRewardsStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(6, 0),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(12, 0, 3),
    },
  },

  wrapper: {
    display: 'grid',
    gap: '40px 0',

    [theme.breakpoints.up('sm')]: {
      gap: '0 30px',
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [theme.breakpoints.up('md')]: {
      gap: '0 70px',
    },
  },

  imgContainer: {
    margin: '0 auto',
    alignSelf: 'center',
    fontSize: 293,

    [theme.breakpoints.up('sm')]: {
      fontSize: 310,
    },

    [theme.breakpoints.up('md')]: {
      fontSize: 482,
    },
  },

  content: {},

  title: {
    lineHeight: 1.23,
    margin: theme.spacing(0, 0, 3),

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 0, 5),
    },

    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(4, 0, 5),
    },
  },

  titleWithAnimations: {
    opacity: 0,
    transform: 'translateY(10px)',
    transitionProperty: 'opacity, transform',
    transitionDuration: '1s, 1s',
  },

  text: {
    lineHeight: 1.4,
    marginBottom: theme.spacing(2.5),
    maxWidth: 570,

    '&:last-of-type': {
      marginBottom: 0,
    },
  },

  textBolder: {
    fontWeight: 500,
  },

  textWithAnimations: {
    opacity: 0,
    transform: 'translateY(10px)',
    transitionProperty: 'opacity, transform',
    transitionDuration: '1s, 1s',
    transitionDelay: '0.2s, 0.2s',
  },

  fadeInUp: {
    opacity: 1,
    transform: 'translateY(0)',
  },
}));
