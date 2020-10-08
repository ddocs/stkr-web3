import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useMarketingStyles = makeStyles<Theme>(theme => ({
  component: {
    minHeight: 208,

    overflow: 'hidden',
  },

  wrapper: {},

  content: {
    padding: theme.spacing(6.75, 7.5),
  },
}));
