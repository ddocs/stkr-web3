import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DEFAULT_FONT, selection } from '../../../../common/themes/mainTheme';

export const usePromoStyles = makeStyles<Theme, { count: number }>(theme => ({
  component: {},

  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 450px',
    gridTemplateAreas: '"title text" "list list" "what-is what-is"',
    gridRowGap: theme.spacing(8),

    fontFamily: DEFAULT_FONT,

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '100%',
      gridTemplateAreas: '"title" "text" "list" "what-is"',
      gridRowGap: theme.spacing(0.5),
    },
  },

  title: {
    margin: 0,

    fontSize: 120,
    lineHeight: 1,
    fontWeight: 500,

    [theme.breakpoints.down('sm')]: {
      fontSize: 53,
    },

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
    maxWidth: 379,
    margin: 0,
    marginTop: 'auto',

    fontSize: 18,
    lineHeight: 1.46,

    '&::selection': selection,

    '& *::selection': selection,
  },

  info: {
    gridArea: 'list',
  },

  whatIs: {
    gridArea: 'what-is',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: 'auto auto',
    gridRowGap: theme.spacing(5),
    gridColumnGap: theme.spacing(4),

    padding: theme.spacing(7.5, 0),
  },

  caption: {
    gridColumn: '1/2',
    gridRow: '-1/1',

    padding: theme.spacing(0, 4.5),

    '& span span': {
      color: theme.palette.primary.main,
    },
  },

  note: {
    gridColumn: '2/4',

    padding: theme.spacing(0, 4.5),
  },
}));
