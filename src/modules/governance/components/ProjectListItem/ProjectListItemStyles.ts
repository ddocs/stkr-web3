import { fade, makeStyles } from '@material-ui/core/styles';

const HorizontalPadding = 7;

export const useProjectListItemStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4.5, HorizontalPadding),
  },
  name: {
    marginBottom: theme.spacing(2),
    fontSize: 20,
    fontWeight: 500,
  },
  description: {
    marginBottom: theme.spacing(4.5),
    fontSize: 16,
    color: fade(theme.palette.common.white, 0.7),
  },
  divider: {
    marginLeft: -theme.spacing(HorizontalPadding),
    marginRight: -theme.spacing(HorizontalPadding),
    marginBottom: theme.spacing(4),
  },
  progressBar: {
    flex: 1,
    margin: theme.spacing(0, 4, 3, 4),
  },
  votes: {
    fontSize: 13,
    color: fade(theme.palette.common.white, 0.65),
    fontWeight: 500,
  },
  label: {
    marginBottom: 6,
  },
}));
