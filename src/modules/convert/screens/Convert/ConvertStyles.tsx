import { makeStyles } from '@material-ui/core/styles';

export const useConvertStyles = makeStyles(
  theme => ({
    label: {
      fontSize: 20,
    },
    value: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    divider: {
      margin: theme.spacing(0, -11.5, 7, -11.5),
    },
  }),
  { index: 10 },
);
