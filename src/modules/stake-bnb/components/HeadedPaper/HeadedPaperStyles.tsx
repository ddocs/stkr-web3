import { makeStyles } from '@material-ui/core/styles';

export const useHeadedPaperStyles = makeStyles(theme => ({
  root: {
    maxWidth: 894,
    width: '100%',
    alignSelf: 'center',
    justifySelf: 'center',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '90%',
    },
  },
  subtitle: {
    '& a': {
      color: 'inherit',
      textDecoration: 'underline',
    },
  },
  icon: {
    verticalAlign: 'middle',
    marginBottom: theme.spacing(1.25),
  },
}));
