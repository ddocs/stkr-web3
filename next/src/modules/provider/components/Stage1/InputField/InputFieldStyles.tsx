import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme } from '@material-ui/core';

export const useInputFieldStyles = makeStyles((theme: Theme) =>
  createStyles({
    component: {
      position: 'relative',

      display: 'grid',
      gridTemplateRows: '100%',
      gridTemplateColumns: '100%',
    },

    wrapper: {
      position: 'relative',
    },

    message: {
      position: 'absolute',
      top: theme.spacing(0.25),

      color: theme.palette.error.main,
      fontSize: 12,
    },
  }),
);
