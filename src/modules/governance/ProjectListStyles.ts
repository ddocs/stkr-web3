import { fade, makeStyles } from '@material-ui/core/styles';

export const useModerationStatusStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(10),
  },
  stats: {
    padding: theme.spacing(2, 2, 2, 4.5),
    display: 'flex',
    alignItems: 'center',
    maxWidth: 712,
    margin: theme.spacing(0, 'auto', 6.5, 'auto'),
  },
  power: {
    color: fade(theme.palette.common.white, 0.5),
  },
  statsText: {
    fontWeight: 500,
    marginRight: theme.spacing(1),
  },
  plusIcon: {
    padding: 0,
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: theme.spacing(7),
  },
}));
