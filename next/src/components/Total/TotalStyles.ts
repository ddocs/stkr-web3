import { Theme } from '@material-ui/core';
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
    margin: theme.spacing(0, 3),
  },
  extension: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
}));
