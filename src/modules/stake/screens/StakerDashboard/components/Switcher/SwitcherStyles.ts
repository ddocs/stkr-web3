import { fade, makeStyles, Theme } from '@material-ui/core/styles';

export const useSwitcherStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 'auto',
  },
  button: {
    fontSize: 18,
    fontWeight: 500,
  },
  inactive: {
    '& .background': {
      fill: fade(theme.palette.common.white, 0.5),
      color: fade(theme.palette.common.white, 0.5),
    },
  },
}));
