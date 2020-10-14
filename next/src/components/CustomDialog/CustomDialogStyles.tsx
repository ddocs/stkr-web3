import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useCustomDialogStyles = makeStyles<
  Theme,
  { maxWidth?: number; minHeight?: number; largeCloseIcon?: boolean }
>(theme => ({
  component: {
    display: 'grid',
    gridTemplateColumns: '100%',
    gridTemplateRows: '100%',

    width: 'auto',
    maxWidth: props => props.maxWidth,
    maxHeight: '80vh',

    borderRadius: 8,

    backgroundColor: '#181818',

    [theme.breakpoints.down('xs')]: {
      '&&': {
        width: '100%',
        height: '100%',
        maxHeight: 'none',
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

    '& svg': {
      fontSize: 24,
    },
  },
}));
