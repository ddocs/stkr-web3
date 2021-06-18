import { makeStyles } from '@material-ui/core/styles';

export const useAlertDialogStyles = makeStyles(theme => ({
  dialogPaper: {
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: 44,
    backgroundColor: '#0F0F0F',
    height: 540,
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    paddingTop: 0,
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    paddingTop: 32,
    paddingRight: 32,
  },
  iconClose: {
    cursor: 'pointer',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 50px 60px',
  },
  iconAlert: {
    marginBottom: 32,
  },
  title: {
    marginBottom: 24,
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 120,
  },
  divider: {
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '22px',
    padding: '0 50px',
  },
  buttonContinue: {
    width: 190,
    border: '1px solid #3F3F3F',
  },
  buttonClose: {
    width: 190,
  },
}));
