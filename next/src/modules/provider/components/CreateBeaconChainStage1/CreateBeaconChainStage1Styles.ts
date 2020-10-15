import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useCreateBeaconChainStage1Styles = makeStyles<Theme>(theme => ({
  component: {
    display: 'grid',
    gridTemplateRows: 'auto',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: theme.spacing(2),

    alignItems: 'center',
    justifyItems: 'center',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',

    maxWidth: 430,
  },

  title: {
    margin: 0,
  },

  input: {
    width: '100%',
    margin: 0,
    marginTop: theme.spacing(5),
  },

  text: {
    margin: 0,
    marginTop: theme.spacing(3.5),
  },

  button: {
    minWidth: 180,
    marginTop: theme.spacing(5),
  },

  image: {
    gridRow: '-1/1',
    gridColumn: '2/3',
  },
}));
