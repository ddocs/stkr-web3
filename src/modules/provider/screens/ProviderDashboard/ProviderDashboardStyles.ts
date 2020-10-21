import { Theme } from '@material-ui/core';
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
  info: {
    flexShrink: 0,
    marginBottom: theme.spacing(4),
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
}));
