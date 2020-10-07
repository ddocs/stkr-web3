import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStage3Styles = makeStyles<Theme>(theme => ({
  component: {
    display: 'grid',
    gridTemplateRows: 'auto auto auto auto',
    gridTemplateColumns: 'auto auto',
    gridColumnGap: theme.spacing(5),

    justifyContent: 'space-around',
    alignContent: 'center',
  },

  title: {
    margin: 0,
  },

  text: {
    maxWidth: 450,
    margin: 0,
    marginTop: theme.spacing(7),
  },

  button: {
    minWidth: 180,
    marginTop: theme.spacing(9),
    marginRight: 'auto',
  },

  icon: {
    gridRow: '-1/1',
    gridColumn: '2/3',

    placeSelf: 'center',
  },
}));
