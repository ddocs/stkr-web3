import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useBannerStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
    marginTop: 32,
    [theme.breakpoints.down('lg')]: {
      marginTop: 0,
    },
    [theme.breakpoints.down('sm')]: {
      height: 400,
    },
  },
  panel: {
    position: 'absolute',
    top: '50%',
    right: '50%',
    transform: 'translate(50%, -50%)',
    [theme.breakpoints.down('lg')]: {
      transform: 'translate(50%, -50%) scale(0.7)',
    },
    [theme.breakpoints.down('xs')]: {
      transform: 'scale(0.6)',
    },
    '&.panel_1': {
      zIndex: 0,
      width: 375,
      marginTop: -132,
      marginRight: 196,
      [theme.breakpoints.down('lg')]: {
        marginTop: -92,
        marginRight: 131,
      },
      [theme.breakpoints.down('xs')]: {
        marginTop: 0,
        marginRight: 0,
        right: 59,
        top: 17,
      },
    },
    '&.panel_2': {
      zIndex: 1,
      width: 715,
      [theme.breakpoints.down('xs')]: {
        marginTop: 0,
        overflow: 'hidden',
        right: -145,
        top: 0,
        width: 606,
        transform: 'scale(0.6)',
      },
    },
    '&.panel_3': {
      zIndex: 2,
      width: 215,
      marginTop: 58,
      marginRight: -121,
      [theme.breakpoints.down('lg')]: {
        marginTop: 39,
        marginRight: -85,
      },
      [theme.breakpoints.down('xs')]: {
        marginTop: 0,
        marginRight: 0,
        right: -52,
        top: 175,
      },
    },
  },
}));
