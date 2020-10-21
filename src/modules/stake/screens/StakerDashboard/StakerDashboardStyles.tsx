import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStakerDasboardStyles = makeStyles<Theme>(theme => ({
  component: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(9, 0),
    boxSizing: 'border-box',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
}));
