import { fade, makeStyles } from '@material-ui/core/styles';

export const useTimerStyles = makeStyles(theme => ({
  root: {
    background: fade(theme.palette.common.white, 0.15),
    color: fade(theme.palette.common.white, 0.5),
    padding: theme.spacing(0.5, 2),
    borderRadius: 26,
  },
}));
