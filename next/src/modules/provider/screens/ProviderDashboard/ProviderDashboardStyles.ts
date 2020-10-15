import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useProviderDashboardStyles = makeStyles<Theme>(theme => ({
  component: {
    padding: theme.spacing(6, 0),
  },

  navigation: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginTop: theme.spacing(4),
  },

  create: {
    minWidth: 170,
  },
}));
