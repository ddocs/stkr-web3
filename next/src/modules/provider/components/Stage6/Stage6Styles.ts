import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStage6Styles = makeStyles<Theme>(theme => ({
  component: {
    position: 'relative',

    padding: theme.spacing(12.5),
  },

  close: {
    position: 'absolute',
    top: theme.spacing(3),
    right: theme.spacing(3),
  },

  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gridRowGap: theme.spacing(20),
  },

  title: {
    margin: 0,

    fontSize: 54,
    lineHeight: 1.2,
    color: theme.palette.primary.main,
  },

  fieldset: {
    display: 'flex',
    flexDirection: 'column',
  },

  input: {
    height: 63,
    marginTop: theme.spacing(5),

    '&:first-child': {
      marginTop: 0,
    },
  },

  balance: {
    gridColumn: '-1/1',
  },
}));
