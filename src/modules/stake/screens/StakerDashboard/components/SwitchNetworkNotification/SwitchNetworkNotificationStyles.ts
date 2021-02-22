import { makeStyles, Theme } from '@material-ui/core/styles';

export const useSwitchNetworkNotificationStyles = makeStyles<Theme>(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notice: {
    maxWidth: 510,
  },
}));
