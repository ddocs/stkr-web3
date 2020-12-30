import { makeStyles } from '@material-ui/core/styles';

const PADDING = 20;

export const useCreateProjectStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(10),
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  paper: {
    maxWidth: 955,
    width: '100%',
    padding: theme.spacing(9, PADDING),
  },
  divider: {
    marginBottom: theme.spacing(7),
    marginLeft: -theme.spacing(PADDING),
    marginRight: -theme.spacing(PADDING),
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tooltip: {
    background: 'transparent',
    fontSize: 20,
    fontWeight: 'bold',
  },
}));
