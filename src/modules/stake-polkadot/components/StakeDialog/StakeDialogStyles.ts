import { makeStyles } from '@material-ui/core/styles';

export const useStakeDialogStyles = makeStyles(theme => ({
  root: {
    padding: '0 !important',
    backgroundColor: 'transparent',

    [theme.breakpoints.down('xs')]: {
      width: '100% !important',
      maxWidth: '100% !important',
      marginLeft: 0,
      marginRight: 0,
    },
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
