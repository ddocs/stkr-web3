import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useMarketingStyles = makeStyles<Theme>(theme => ({
  component: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    minHeight: 176,

    overflow: 'hidden',

    [theme.breakpoints.down('xs')]: {
      minHeight: 254,
    },
  },
}));
