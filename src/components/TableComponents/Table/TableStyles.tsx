import { createStyles } from '@material-ui/core';
import { defaultTheme } from '../../../common/themes/mainTheme';

export const TABLE_MIN_WIDTH = 808;

export const tableStyles = createStyles({
  container: {
    [defaultTheme.breakpoints.up('sm')]: {
      overflow: 'hidden',
      overflowX: 'auto',
    },

    [defaultTheme.breakpoints.up('md')]: {
      overflow: 'visible',
    },
  },
  table: {
    position: 'relative',

    [defaultTheme.breakpoints.up('sm')]: {
      minWidth: TABLE_MIN_WIDTH,
      overflow: 'visible',
      height: '100%',
      boxSizing: 'border-box',
    },
  },
});
