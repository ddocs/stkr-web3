import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    background: '#363636',
    borderRadius: 24,
    color: '#fff',
    padding: '4px 20px',
    fontSize: 13,
  },
}));
