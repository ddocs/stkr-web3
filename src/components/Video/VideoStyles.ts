import { fade, makeStyles } from '@material-ui/core/styles';

export const useVideoStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',

    [theme.breakpoints.up('sm')]: {
      borderRadius: 40,
    },
  },
  preview: {
    '& video': {
      display: 'block',
    },
  },
  play: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: 66,
    margin: 'auto',
    transition: 'transform 300ms',
    cursor: 'pointer',
    '& circle': {
      fill: fade(theme.palette.common.white, 0.5),
    },
    '&:hover ': {
      transform: 'scale(1.17)',
      '& circle': {
        fill: fade(theme.palette.common.white, 0.8),
      },
    },

    [theme.breakpoints.up('sm')]: {
      width: 122,
    },
  },
  dialogPaper: {
    background: 'transparent',
    boxShadow: 'none',
  },
  videoBox: {
    position: 'relative',
    paddingBottom: '52.25%',
    paddingTop: 30,
    height: 0,
    overflow: 'hidden',
    '& iframe, & object, & embed, & video': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
  },
  close: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
}));
