import { makeStyles } from '@material-ui/core/styles';

export const useSupportProjectFormStyles = makeStyles(theme => ({
  balance: {
    fontSize: 14,
    opacity: 0.5,
    lineHeight: 1.5,
    paddingTop: 15,
    textAlign: 'right',
  },
  inputContainer: {},
  input: {
    flexDirection: 'row-reverse',
    alignItems: 'baseline',

    '& label': {
      paddingLeft: 15,
    },
    '& div': {
      border: 'none',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 0,
    },
    '& p': {
      position: 'absolute',
      bottom: -20,
      right: 50,
    },
  },
  inputLabel: {
    paddingRight: 15,
  },
  line: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 42,
  },
  footer: {
    borderTop: '1px solid rgba(255,255,255,0.2)',
    margin: '42px -160px 0',
    padding: '50px 160px 0',
    display: 'flex',
  },
  disclaimerText: {
    marginLeft: theme.spacing(3),
    fontSize: 14,
  },
  disclaimerInput: {
    flex: 1,
  },
  button: {
    width: 216,
    boxSizing: 'content-box',
    marginLeft: 50,
  },
  buttonContainer: {
    display: 'flex',
    position: 'relative',

    '& svg': {
      position: 'absolute',
      top: 5,
      right: -60,
    },
  },
}));
