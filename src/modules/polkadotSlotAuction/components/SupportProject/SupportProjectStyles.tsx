import { makeStyles } from '@material-ui/core/styles';

export const useSupportProjectStyles = makeStyles(theme => ({
  container: {
    background: '#000000',
    border: '1px solid #3F3F3F',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 65,
    padding: '52px 160px',
    position: 'relative',
    maxWidth: 1130,
    margin: '0 auto',
  },
  title: {
    paddingBottom: 84,
    textAlign: 'center',
  },
  close: {
    position: 'absolute',
    top: 36,
    right: 36,
  },
}));
