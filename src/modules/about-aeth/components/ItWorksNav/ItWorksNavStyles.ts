import { Theme, fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Seconds } from '../../../../common/types';

const transitionTime: Seconds = 0.3;

export const useItWorksNavStyles = makeStyles<
  Theme,
  { textWrapHeight?: number | string }
>(theme => ({
  root: {
    position: 'relative',
  },

  list: {
    margin: 0,
    padding: 0,
    display: 'grid',
    gridAutoColumns: '100%',
    gap: `${theme.spacing(4)}px`,
    borderLeft: `1px solid ${fade('#fff', 0.2)}`,
  },

  item: {
    position: 'relative',
    listStyle: 'none',
    padding: theme.spacing(0, 0, 0, 4.5),

    '&::before': {
      content: `''`,
      position: 'absolute',
      left: '-1px',
      top: 0,
      bottom: 0,
      borderLeft: `1px solid ${fade('#fff', 0)}`,
      transform: 'scaleY(0.2)',
      transition: `all ${transitionTime}s ease`,
    },
  },

  itemActive: {
    '&::before': {
      borderColor: theme.palette.primary.main,
      transform: 'scaleY(1)',
    },
  },

  title: {
    cursor: 'pointer',
    transition: `all ${transitionTime}s`,
    whiteSpace: 'nowrap',
    color: theme.palette.text.secondary,
    userSelect: 'none',

    '&:hover': {
      color: fade(theme.palette.text.primary, 0.8),
    },
  },

  titleActive: {
    cursor: 'auto',
    userSelect: 'auto',
    color: theme.palette.text.primary,

    '&:hover': {
      color: theme.palette.text.primary,
    },
  },

  textWrap: {
    height: 0,
    overflow: 'hidden',
    transition: `height ${transitionTime}s`,
  },

  textWrapActive: {
    height: props => props.textWrapHeight,
  },

  text: {
    padding: theme.spacing(3.5, 0, 0),
    transition: `opacity ${transitionTime}s`,
    opacity: 0,
    maxWidth: 530,
  },

  textActive: {
    opacity: 1,
  },
}));
