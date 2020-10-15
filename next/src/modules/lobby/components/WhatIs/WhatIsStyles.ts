import { makeStyles } from '@material-ui/core/styles';

export const useWhatIsStyles = makeStyles(theme => ({
  title: {
    '& span span': {
      color: theme.palette.primary.main,
    },
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '400px 1fr',
    columnGap: theme.spacing(8),
    padding: theme.spacing(7.5, 4.5),
    width: '100%',
  },
  note: {
    marginBottom: theme.spacing(5),
  },
}));
