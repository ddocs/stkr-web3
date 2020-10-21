import { makeStyles } from '@material-ui/core/styles';

export const useAmountStyles = makeStyles(theme => ({
  component: {
    display: 'flex',
    alignItems: 'baseline',
  },
  unit: {
    marginLeft: theme.spacing(1.5),
  },
}));
