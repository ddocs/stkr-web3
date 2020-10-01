import { makeStyles } from '@material-ui/styles';
import { fade, Theme } from '@material-ui/core';

export const useDialogStyles = makeStyles<
  Theme,
  { maxWidth?: number; minHeight?: number; largeCloseIcon?: boolean }
>(theme => ({
  component: {
    display: 'grid',
    gridTemplateColumns: '100%',
    gridTemplateRows: '100%',

    width: 'calc(100% - 64px)',
    maxWidth: props => props.maxWidth,
    maxHeight: '86vh',

    borderRadius: 12,

    [theme.breakpoints.down('xs')]: {
      '&&': {
        width: '100%',
        height: '100%',
        maxHeight: 'none',

        borderRadius: 0,
      },
    },
  },

  content: {
    position: 'relative',

    display: 'flex',
    flexDirection: 'column',

    width: '100%',
    height: '100%',
    minHeight: props => props.minHeight,

    outline: 'none',
  },

  wrapper: {
    position: 'relative',

    width: '100%',
    height: '100%',
    maxHeight: '100%',
    maxWidth: '100%',

    overflowY: 'auto',
  },

  wrapperOverflowHidden: {
    '&&': {
      overflow: 'hidden',
    },
  },

  close: {
    position: 'absolute',
    top: 0,
    right: 0,

    color: fade(theme.palette.text.primary, 0.9),

    '& svg': {
      color: 'inherit',
      fontSize: 24,
    },

    '&:hover, &:focus': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
    },
  },
}));
