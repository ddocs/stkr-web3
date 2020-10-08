import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const useSocialStyles = makeStyles<Theme>(theme => ({
  component: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    fontSize: 16,
    lineHeight: 1.2,
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },

  list: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    padding: 0,
    margin: 0,
    marginLeft: theme.spacing(2),

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
