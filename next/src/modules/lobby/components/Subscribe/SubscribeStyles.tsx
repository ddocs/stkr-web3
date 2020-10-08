import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useSubscribeStyles = makeStyles<Theme>(theme => ({
  component: {
    '&&': {
      display: 'grid',
      gridTemplateColumns: '260px 620px',
      gridColumnGap: theme.spacing(3),

      justifyContent: 'space-between',
    },
  },

  title: {
    '&&': {
      fontWeight: 400,
    },
  },

  form: {
    alignSelf: 'center',
  },
}));
