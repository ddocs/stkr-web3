import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useSidecarLauncherStyles = makeStyles<
  Theme,
  { popoverWidth?: number }
>(theme => ({
  button: {
    fontWeight: 400,
    justifyContent: 'space-between',

    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center',
    },
  },

  buttonIcon: {
    '&& > svg': {
      fontSize: 26,
    },
  },

  popover: {
    marginTop: theme.spacing(-0.5),
  },

  links: {
    display: 'grid',
    gap: theme.spacing(1.5, 0),
    width: props => props.popoverWidth || 'auto',
    padding: theme.spacing(2, 2),
    background: theme.palette.background.default,
  },

  link: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: theme.spacing(0, 1.5),
    alignItems: 'center',
    textAlign: 'left',

    padding: 0,
    background: 'none',
    border: 'none',
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    transition: 'color 0.2s',

    '&:hover, &:focus': {
      color: theme.palette.text.primary,
    },

    '&:focus': {
      outline: 'none',
    },
  },

  linkIcon: {
    opacity: 0.5,
    transition: 'opacity 0.2s',

    '& svg': {
      display: 'block',
    },

    '$link:hover &, $link:focus &': {
      opacity: 1,
    },
  },
}));
