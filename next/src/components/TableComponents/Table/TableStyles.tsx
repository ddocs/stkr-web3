import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const TABLE_MIN_WIDTH = 808;

export const useTableStyles = makeStyles<Theme>(() => ({
  container: {},
  table: {
    position: 'relative',
    minWidth: TABLE_MIN_WIDTH,
    height: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
}));
