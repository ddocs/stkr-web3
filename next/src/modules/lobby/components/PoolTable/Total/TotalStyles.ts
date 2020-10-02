import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useTotalStyles = makeStyles<Theme, { width: number }>(theme => ({
  component: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    fontSize: 16,
    lineHeight: 1.5,
    color: theme.palette.primary.main,
    fontWeight: 500,
  },

  range: {
    position: 'relative',

    display: 'inline-block',
    width: 115,
    height: 4,
    margin: theme.spacing(0, 3),

    borderRadius: 1,
    backgroundColor: fade(theme.palette.grey[100], 0.2),

    overflow: 'hidden',

    '&::after': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      content: '""',

      display: 'block',
      width: props => props.width,

      borderRadius: 1,

      backgroundColor: theme.palette.primary.main,
    },
  },

  button: {
    minWidth: 100,
    marginLeft: 'auto',
  },
}));
