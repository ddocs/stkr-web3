import { makeStyles } from '@material-ui/core/styles';

export const useAboutSmartchainStyles = makeStyles(theme => ({
  content: {
    '&&': {
      marginTop: theme.spacing(10),
      maxWidth: 1148,
    },
  },
  image1: {
    marginBottom: theme.spacing(11.5),
    maxWidth: '100%',
  },
  image2: {
    maxWidth: '100%',
  },
  submit: {
    maxWidth: 250,
  },
}));
