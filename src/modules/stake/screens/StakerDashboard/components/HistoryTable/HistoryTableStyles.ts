import { makeStyles, Theme } from '@material-ui/core/styles';

export const useHistoryTableStyles = makeStyles<Theme>(() => ({
  root: {},
  table: {
    '&&': {
      minWidth: 0,
    },
  },
  headCellContent: {
    display: 'flex',
    alignItems: 'center',
  },
}));
