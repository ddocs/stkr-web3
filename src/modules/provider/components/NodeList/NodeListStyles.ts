import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core';

export const useNodeListStyles = makeStyles<Theme>(theme => ({
  component: {},
  table: {
    width: '100%',
  },
  icon: {
    padding: 0,
    marginRight: theme.spacing(1.5),
    '&.Mui-disabled': {
      opacity: 0.5,
    },
  },
}));
