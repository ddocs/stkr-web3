import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useAdvantagesStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(6, 0),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3, 0),
    },
  },

  wrapper: {
    display: 'grid',
    gap: '70px 0',

    [theme.breakpoints.up('sm')]: {
      gap: '0 30px',
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },

  imgContainer: {
    margin: '0 auto',
    alignSelf: 'start',
    fontSize: 236,

    [theme.breakpoints.up('sm')]: {
      order: 1,
      fontSize: 290,
    },

    [theme.breakpoints.up('md')]: {
      fontSize: 397,
    },
  },

  content: {
    [theme.breakpoints.up('sm')]: {
      alignSelf: 'center',
    },
  },

  title: {
    margin: theme.spacing(0, 0, 3),

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 0, 5),
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
    maxWidth: 535,

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
