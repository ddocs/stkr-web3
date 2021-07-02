import { makeStyles } from '@material-ui/core/styles';

export const useStakeDialogStyles = makeStyles(theme => ({
  root: {
    padding: '0 !important',
    backgroundColor: 'transparent',
  },
  close: {
    position: 'absolute',

    [theme.breakpoints.up('xs')]: {
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
    [theme.breakpoints.up('sm')]: {
      right: theme.spacing(3),
      top: theme.spacing(3),
    },
  },
}));
