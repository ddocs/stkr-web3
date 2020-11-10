import { makeStyles, Theme } from '@material-ui/core/styles';

export const useCheckboxStyles = makeStyles<Theme>(theme => ({
  formControlLabel: {
    alignItems: 'flex-start',
    marginLeft: -theme.spacing(0.5),
    marginRight: theme.spacing(1),
  },
  checkbox: {
    marginTop: -9,
  },
  error: {
    marginTop: -5,
    marginBottom: 16,
  },
  checked: {},
  label: {
    color: theme.palette.primary.main,
    marginLeft: 4,
  },
}));
