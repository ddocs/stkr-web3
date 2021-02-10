import { makeStyles } from '@material-ui/core/styles';

export const useAboutAethStyles = makeStyles(
  theme => ({
    services: {
      padding: theme.spacing(6, 0),

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(12, 0, 7),
      },
    },
  }),
  { index: 1 },
);
