import { makeStyles, Theme } from '@material-ui/core/styles';

export const useHistoryTableStyles = makeStyles<Theme>(theme => ({
  root: {},
  tableWrapper: {},
  table: {
    '&&': {
      minWidth: 0,
    },
  },
  head: {},
  body: {},
  cell: {},
  headCell: {},
  headCellContent: {
    display: 'flex',
    alignItems: 'center',
  },
  bodyCell: {},
}));
