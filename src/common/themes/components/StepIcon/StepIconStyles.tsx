import { fade, makeStyles } from '@material-ui/core/styles';

export const useStepIconStyles = makeStyles(theme => ({
  root: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${fade(theme.palette.common.white, 0.2)}`,
    fontSize: 18,
    fontWeight: 'bold',
  },
  active: {
    borderColor: theme.palette.primary.main,
  },
}));
