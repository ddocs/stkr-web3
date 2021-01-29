import { makeStyles } from '@material-ui/core/styles';

export const useRulesDialogStyles = makeStyles(theme => ({
  close: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  tip: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(5.5),
    backgroundColor: 'rgba(255, 232, 25, 0.1)',
    borderRadius: 60,
    height: theme.spacing(5),
    lineHeight: '40px',
    padding: '0 10px',
    margin: '0 auto',
    maxWidth: 420,
  },
  icon: {
    marginRight: 10,
  },
  link: {
    display: 'block',
    color: 'inherit',
    textDecoration: 'none',
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
