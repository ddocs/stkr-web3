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

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '100%',
      gridTemplateAreas: '"title" "text" "list"',
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
}));
