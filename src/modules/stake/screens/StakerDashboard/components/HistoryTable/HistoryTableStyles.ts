import { makeStyles, Theme } from '@material-ui/core/styles';

export const useHistoryTableStyles = makeStyles<Theme>(() => ({
  root: {},
  headCellContent: {
    display: 'flex',
    alignItems: 'center',
  },
}));
