import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStage7Styles = makeStyles<Theme>(theme => ({
  component: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    margin: 0,
    marginTop: theme.spacing(7),

    textAlign: 'center',
  },

  bar: {
    marginTop: theme.spacing(5),
  },

  text: {
    margin: 0,
    marginTop: theme.spacing(3),
  },

  icon: {
    order: -1,
  },
}));
