import { makeStyles } from '@material-ui/core/styles';

export const useRulesDialogStyles = makeStyles(theme => ({
  close: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  item: {
    marginBottom: theme.spacing(4),
  },
  list: {
    marginBottom: theme.spacing(7.5),
  },
  dialogPaper: {
    padding: theme.spacing(10),
  },
}));
