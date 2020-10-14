import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { selection } from '../../common/themes/mainTheme';

export const useInfoStyles = makeStyles<Theme, { count: number }>(theme => ({
  component: {},

  list: {
    display: 'grid',
    gridTemplateColumns: props => `repeat(${props.count}, 1fr)`,
    gridColumnGap: theme.spacing(4),

    margin: 0,
    padding: 0,

    listStyle: 'none',
  },

  item: {
    display: 'flex',
    flexDirection: 'column',

    padding: theme.spacing(2.5, 4.5, 3),

    fontSize: 18,
    lineHeight: 1.2,

    '&::selection': selection,

    '& *::selection': selection,
  },

  value: {
    marginTop: theme.spacing(10),
  },
}));
