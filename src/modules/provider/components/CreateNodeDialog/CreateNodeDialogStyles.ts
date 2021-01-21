import { makeStyles } from '@material-ui/core/styles';

export const useCreateNodeDialogStyles = makeStyles(theme => ({
  close: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  dialogPaper: {
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: 44,
    backgroundColor: '#0F0F0F',
  },
  root: {
    '&:first-child': {
      paddingTop: 0,
    },
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'start',
    },
  },
  separator: {
    width: 1,
    background: 'rgba(255, 255, 255, 0.2)',
    [theme.breakpoints.down('sm')]: {
      height: 1,
    },
  },
  side: {
    flex: 1,
    padding: `${theme.spacing(13)}px ${theme.spacing(8.5)}px ${theme.spacing(
      8.5,
    )}px`,
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  items: {
    padding: 0,
    opacity: 0.5,
    fontSize: 16,
    textAlign: 'left',
    '& li': {
      padding: theme.spacing(1.5),
    },
  },
  button: {
    marginTop: theme.spacing(2),
    width: 256,
    padding: theme.spacing(2),
  },
}));
