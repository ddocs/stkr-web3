import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DEFAULT_FONT, selection } from '../../../../common/themes/mainTheme';

export const useCalculateStyles = makeStyles<Theme>(theme => ({
  component: {},

  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 290px',
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
}));
