import { fade, makeStyles, Theme } from '@material-ui/core';

export const usePlusMinusBtnStyles = makeStyles<Theme>(theme => ({
  root: {
    border: `1px solid ${fade(theme.palette.text.primary, 0.2)}`,
    transition: 'border 0.2s',
    color: theme.palette.text.primary,
    width: 48,
    height: 48,

    '&:hover': {
      borderColor: theme.palette.text.primary,
      background: 'none',
    },

    '& svg': {
      color: 'inherit',
    },
  },

  tooltip: {
    padding: theme.spacing(0.75, 2),
    backgroundColor: theme.palette.background.default,
    fontSize: 13,
    color: theme.palette.text.secondary,
    border: `1px solid ${fade(theme.palette.text.primary, 0.2)}`,
    fontWeight: 400,
  },

  tooltipArrow: {
    color: theme.palette.background.default,

    '&:before': {
      border: `1px solid ${fade(theme.palette.text.primary, 0.2)}`,
    },
  },
}));
