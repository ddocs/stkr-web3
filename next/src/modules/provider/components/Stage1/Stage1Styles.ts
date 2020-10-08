import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStage1Styles = makeStyles<Theme>(theme => ({
  component: {
    display: 'grid',
    gridTemplateRows: 'auto auto auto auto',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: theme.spacing(20),

    alignItems: 'center',
  },

  message: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    margin: 0,

    '&::before': {
      position: 'relative',
      content: '""',

      display: 'block',
      width: 4,
      height: 23,
      marginRight: theme.spacing(2),

      backgroundColor: theme.palette.primary.main,
    },
  },

  title: {
    margin: 0,
    marginTop: theme.spacing(3),
  },

  text: {
    maxWidth: 420,

    margin: 0,
    marginTop: theme.spacing(5),
  },

  form: {
    maxWidth: 490,
    marginTop: theme.spacing(11),
  },

  image: {
    gridRow: '-1/1',
    gridColumn: '1/2',

    placeSelf: 'center',
  },
}));
