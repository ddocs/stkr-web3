import { makeStyles } from '@material-ui/core/styles';

export const useEmptyNodeListStyles = makeStyles(theme => ({
  image: {
    marginBottom: theme.spacing(5.5),
  },
  button: {
    maxWidth: 244,
  },
  buttonTextShort: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  buttonTextFull: {
    display: 'none',

    [theme.breakpoints.up('sm')]: {
      display: 'inline',
    },
  },
}));
