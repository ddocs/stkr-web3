import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStage6Styles = makeStyles<Theme>(theme => ({
  component: {},

  input: {
    height: 63,
    marginTop: theme.spacing(5),

    '&:first-child': {
      marginTop: 0,
    },
  },
}));
