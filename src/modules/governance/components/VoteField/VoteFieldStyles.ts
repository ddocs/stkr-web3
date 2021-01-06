import { makeStyles } from '@material-ui/core/styles';

export const useVoteFieldStyles = makeStyles(theme => ({
  voteButton: {
    height: 'auto',
    padding: theme.spacing(3, 1.5),
    borderRadius: 24,
    fontSize: 20,
    fontWeight: 500,
    '&:hover, &:focus': {
      backgroundColor: 'transparent',
      color: '#fff',
    },
  },
  voteButtonLabel: {
    display: 'flex',
    flexDirection: 'column',
  },
  voteCount: {
    marginTop: theme.spacing(0.75),
    fontSize: 16,
    fontWeight: 500,
  },
  active: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));
