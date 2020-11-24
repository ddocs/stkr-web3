import { fade, makeStyles, Theme } from '@material-ui/core/styles';

export const useHistoryTableStyles = makeStyles<Theme>(theme => ({
  tableWrapper: {
    height: '100%',
  },
  table: {
    '&&': {
      minWidth: 0,
    },
  },
  head: {
    '&&': {
      position: 'relative',
      padding: 0,
      '&::before': {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        content: '""',
        display: 'block',
        height: 1,
        backgroundColor: fade(theme.palette.text.primary, 0.2),
      },
    },
  },
  body: {
    '&&': {
      padding: 0,
      height: 'calc(100% - 45px)',
    },
  },
  cell: {
    '&&': {
      backgroundColor: 'transparent',
    },
  },
  headCell: {
    '&&': {
      paddingTop: 0,
      paddingBottom: theme.spacing(2.5),
      fontSize: 16,
      fontWeight: 500,
      color: fade(theme.palette.text.primary, 0.5),
    },
  },
  headCellContent: {
    display: 'flex',
    alignItems: 'center',
  },
  bodyCell: {
    '&&': {
      paddingTop: theme.spacing(2.5),
      paddingBottom: theme.spacing(2.5),
    },
  },
}));
