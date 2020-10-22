import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useTotalStyles = makeStyles<
  Theme,
  { value: number; width: string | number }
>(theme => ({
  root: {
    position: 'relative',
    display: 'inline-block',
    width: props => props.width,
    height: 4,
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
      width: props => `${props.value}%`,
      borderRadius: 1,
      backgroundColor: theme.palette.primary.main,
    },
  },
}));
