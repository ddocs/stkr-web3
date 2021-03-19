import { makeStyles } from '@material-ui/core/styles';

export const useBnbFetchStatsError = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  cancel: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));
