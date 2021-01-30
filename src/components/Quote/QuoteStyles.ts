import { makeStyles } from '@material-ui/core/styles';

export const useQuoteStyles = makeStyles(theme => ({
  root: {
    fontSize: 16,
    fontWeight: 400,
    paddingLeft: theme.spacing(1.5),
    position: 'relative',
    '&:before': {
      content: "''",
      position: 'absolute',
      left: 0,
      background: theme.palette.primary.main,
      width: 2,
      height: '100%',
      top: 0,
      bottom: 0,
    },
  },
}));
