import { makeStyles } from '@material-ui/core/styles';

export const useStayTunedStyles = makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(9),
  },
  content: {
    display: 'grid',
    gridGap: theme.spacing(4.5),
    gridTemplateColumns: '1fr 1.2fr',
    '& > *:nth-child(1)': {
      gridColumn: 1,
      gridRow: '1 / 3',
      padding: theme.spacing(7, 5, 13.5, 5),
    },
    '& > *:nth-child(2)': {
      gridColumn: '2 / 3',
      gridRow: '1 / 2',
      padding: theme.spacing(5, 6.5, 5.5, 6.5),
    },
    '& > *:nth-child(3)': {
      gridColumn: '2 / 3',
      gridRow: 2,
      padding: theme.spacing(5, 6.5, 5.5, 6.5),
    },
  },
  mainNewsImage: {
    marginBottom: theme.spacing(5),
  },
  mainNewsHeader: {
    marginBottom: theme.spacing(3),
    maxWidth: 452,
  },
  secondaryNewsItem: {
    display: 'flex',
    alignItems: 'center',
  },
  secondaryNewsImage: {
    marginRight: theme.spacing(13),
  },
  secondaryNewsHeader: {
    marginBottom: theme.spacing(2.5),
  },
}));
