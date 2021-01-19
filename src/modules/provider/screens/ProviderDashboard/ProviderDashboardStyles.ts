import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useProviderDashboardStyles = makeStyles<Theme>(theme => ({
  component: {
    height: '100%',
    padding: theme.spacing(6, 0),
    boxSizing: 'border-box',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'initial',
    height: '100%',
  },
  navigation: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
  },
  create: {
    minWidth: 170,
  },
  table: {
    flexGrow: 1,
  },
  balance: {
    fontSize: 14,
    fontWeight: 500,
    color: fade(theme.palette.common.white, 0.5),
    textAlign: 'right',
    '&&': {
      marginRight: theme.spacing(3),
    },
  },
}));
