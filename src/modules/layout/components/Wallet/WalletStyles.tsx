import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useWalletStyles = makeStyles<Theme>(theme => ({
  component: {
    position: 'relative',
  },

  toggle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    minHeight: 40,
    padding: theme.spacing(0.5, 0),
    boxSizing: 'border-box',
    fontSize: 14,
    lineHeight: 1.2,
    color: theme.palette.text.secondary,
    border: `none`,
    backgroundColor: 'transparent',
    cursor: 'pointer',

    '&:focus': {
      outline: 'none',
    },
  },

  address: {
    '&::after': {
      position: 'relative',
      order: -1,
      content: '""',
      display: 'block',
      width: 1,
      height: 22,
      margin: theme.spacing(0, 1.5, 0, 1.8),
      backgroundColor: fade(theme.palette.text.primary, 0.2),
    },
  },

  dropdown: {
    position: 'absolute',
    zIndex: theme.zIndex.tooltip,
    top: '100%',
    right: 0,
    left: 0,
    marginTop: theme.spacing(1),

    pointerEvents: 'none',
    opacity: 0,
    transform: `translateY(-${theme.spacing(1)}px)`,
    transition: 'opacity 0.2s, transform 0.2s',

    [theme.breakpoints.up('md')]: {
      left: 'auto',
    },
  },

  dropdownActive: {
    opacity: 1,
    transform: 'translateY(0)',
    pointerEvents: 'initial',
  },
}));
