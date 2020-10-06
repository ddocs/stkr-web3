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

    label: {
      position: 'absolute',
      top: 0,
      left: 0,

      width: 1,
      height: 1,
      padding: 0,
      overflow: 'hidden',

      whiteSpace: 'nowrap',

      border: 0,

      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(100%)',
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
