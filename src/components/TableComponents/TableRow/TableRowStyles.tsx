import { makeStyles } from '@material-ui/styles';

export const useTableRowStyles = makeStyles(() => ({
  row: {
    display: 'contents',
  },
  rowHovered: {
    position: 'relative',
    textDecoration: 'none',
    '&:hover $cell:first-child::after': {
      height: '100%',
    },
  },
}));
