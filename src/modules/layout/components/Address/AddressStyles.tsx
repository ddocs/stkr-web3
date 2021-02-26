import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useAddressStyles = makeStyles<Theme>(theme => ({
  component: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    fontSize: 14,
    lineHeight: 1.2,
    color: theme.palette.text.secondary,
  },

  icon: {
    position: 'relative',
    fontSize: 24,
    marginRight: theme.spacing(1),
  },
}));
