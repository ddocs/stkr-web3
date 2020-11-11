import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const useSocialStyles = makeStyles<Theme>(theme => ({
  component: {
    color: theme.palette.text.secondary,
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
  item: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      margin: 0,
    },
  },
  link: {},
}));
