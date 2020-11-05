import { makeStyles, Theme } from '@material-ui/core/styles';

export const useAmountStyles = makeStyles<Theme>(theme => ({
  component: {
    display: 'flex',
    alignItems: 'baseline',
    fontSize: 74,
    fontWeight: 700,
  },
  unit: {
    marginRight: theme.spacing(4),
  },
}));
