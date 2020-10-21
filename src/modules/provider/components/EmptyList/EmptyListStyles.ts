import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useMicropoolListStyles = makeStyles<Theme>(theme => ({
  component: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gridTemplateRows: 'auto auto auto auto',
    gridRowGap: theme.spacing(4),
    justifyItems: 'flex-start',
    alignContent: 'center',

    height: '100%',
    padding: theme.spacing(5, 0),

    boxSizing: 'border-box',
  },

  title: {
    margin: 0,
  },

  text: {
    maxWidth: 520,
    margin: 0,
  },

  button: {
    minWidth: 260,
    marginTop: theme.spacing(1.5),
  },

  icon: {
    gridColumn: '1/2',
    gridRow: '-1/1',

    placeSelf: 'center',
  },
}));
