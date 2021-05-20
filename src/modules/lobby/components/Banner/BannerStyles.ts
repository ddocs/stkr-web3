import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useBannerStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
    height: 500,
    [theme.breakpoints.down('lg')]: {
      height: 400,
    },
  },
  panel: {
    position: 'absolute',
    '&.panel_1': {
      top: -85,
      right: 250,
      zIndex: 0,
      width: 375,
      [theme.breakpoints.down('lg')]: {
        transform: 'scale(0.7)',
        right: 209,
      },
      [theme.breakpoints.down('sm')]: {
        top: '50%',
        right: '50%',
        transform: 'translate(50%, -50%) scale(0.7)',
        marginTop: -92,
        marginRight: 131,
      },
    },
    '&.panel_2': {
      top: -55,
      right: -120,
      zIndex: 1,
      width: 715,
      [theme.breakpoints.down('lg')]: {
        transform: 'scale(0.7)',
        top: -4,
        right: -100,
      },
      [theme.breakpoints.down('sm')]: {
        top: '50%',
        right: '50%',
        transform: 'translate(50%, -50%) scale(0.7)',
      },
    },
    '&.panel_3': {
      top: 142,
      right: 11,
      zIndex: 2,
      width: 215,
      [theme.breakpoints.down('lg')]: {
        transform: 'scale(0.7)',
        top: 175,
        right: 63,
      },
      [theme.breakpoints.down('sm')]: {
        top: '50%',
        right: '50%',
        transform: 'translate(50%, -50%) scale(0.7)',
        marginTop: 39,
        marginRight: -85,
      },
    },
  },
}));
