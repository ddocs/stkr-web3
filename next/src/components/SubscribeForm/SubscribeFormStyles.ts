import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useSubscribeFormStyles = makeStyles<Theme>(theme => ({
  form: {
    display: 'grid',
    gridTemplateColumns: `1fr 218px`,
    gridColumnGap: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '100%',
      gridTemplateRows: 'auto auto',
      gridRowGap: theme.spacing(4),
    },
  },

  input: {},

  submit: {},
}));
