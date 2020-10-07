import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DEFAULT_FONT, selection } from '../../../../common/themes/mainTheme';

export const usePromoStyles = makeStyles<Theme, { count: number }>(theme => ({
  component: {},

  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 340px',
    gridTemplateAreas: '"title text" "list list"',
    gridRowGap: theme.spacing(8),

    fontFamily: DEFAULT_FONT,
  },

  title: {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,

    fontSize: 120,
    lineHeight: 1,
    fontWeight: 500,

    '&::selection': selection,

    '& *::selection': selection,

    '& span': {
      display: 'flex',
      flexDirection: 'column',
    },

    '& span span': {
      color: theme.palette.primary.main,
    },
  },

  text: {
    margin: 0,
    marginTop: 'auto',

    fontSize: 18,
    lineHeight: 1.46,

    '&::selection': selection,

    '& *::selection': selection,
  },

  list: {
    gridArea: 'list',
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
