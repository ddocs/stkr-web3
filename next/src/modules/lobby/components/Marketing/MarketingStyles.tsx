import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useMarketingStyles = makeStyles<Theme>(theme => ({
  component: {
    overflow: 'hidden',
  },

  wrapper: {
    display: 'grid',
    gridTemplateColumns: '100%',
    gridTemplateRows: '100%',

    minHeight: 208,
    height: '100%',
  },

  content: {
    display: 'grid',
    gridTemplateColumns: '100%',
    gridTemplateRows: '100%',

    height: '100%',
    padding: theme.spacing(2, 7.5),

    boxSizing: 'border-box',
  },
}));
