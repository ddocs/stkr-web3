import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { selection } from '../../common/themes/mainTheme';

export const useInfoStyles = makeStyles<
  Theme,
  { count: number; small?: boolean }
>(theme => ({
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

    padding: props =>
      !props.small ? theme.spacing(2.5, 4.5, 3) : theme.spacing(2.5, 4.5, 1),

    fontSize: 18,
    lineHeight: 1.2,

    '&::selection': selection,

    '& *::selection': selection,
  },

  value: {
    marginTop: props => (!props.small ? theme.spacing(10) : theme.spacing(0.5)),
  },
}));
