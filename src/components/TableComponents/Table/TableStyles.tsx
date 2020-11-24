import { createStyles } from '@material-ui/core';

export const TABLE_MIN_WIDTH = 808;

export const tableStyles = createStyles({
  container: {},
  table: {
    position: 'relative',
    minWidth: TABLE_MIN_WIDTH,
    height: '100%',
    boxSizing: 'border-box',
  },
});
