import { makeStyles } from '@material-ui/core/styles';

export const useProjectCreatedDialogStyles = makeStyles(theme => ({
  close: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  dialogPaper: {
    padding: theme.spacing(10),
  },
}));
