import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useSubscribeFormStyles = makeStyles<Theme, { width: number }>(
  theme => ({
    form: {
      display: 'grid',
      gridTemplateColumns: props => `1fr ${props.width}px`,
      gridColumnGap: theme.spacing(2),
    },

    input: {},

    submit: {},
  }),
);
