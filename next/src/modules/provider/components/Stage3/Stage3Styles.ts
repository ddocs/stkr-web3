import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStage3Styles = makeStyles<Theme>(theme => ({
  component: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    margin: 0,
    marginTop: theme.spacing(3),

    textAlign: 'center',
  },

  text: {
    maxWidth: 450,
    margin: 0,
    marginTop: theme.spacing(7),

    textAlign: 'center',
  },

  button: {
    minWidth: 180,
    marginTop: theme.spacing(5),
  },

  icon: {
    order: -1,
  },
}));
