import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useLocaleLinksStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },

  label: {
    flexShrink: 0,
    marginRight: theme.spacing(2),
  },

  list: {
    flexGrow: 1,
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'minmax(0, max-content)',
    justifyContent: 'end',
    gap: theme.spacing(0, 2),
  },

  item: {
    padding: '8px 10px',
    textTransform: 'uppercase',
    color: theme.palette.text.secondary,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 14,
  },

  itemActive: {
    color: theme.palette.text.primary,
  },
}));
