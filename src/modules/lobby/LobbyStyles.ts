import { makeStyles } from '@material-ui/core/styles';

export const useLobbyStyles = makeStyles(
  theme => ({
    services: {
      padding: theme.spacing(8, 0),

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(8, 0, 10),
      },
    },
  }),
  { index: 1 },
);
