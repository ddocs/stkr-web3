import { makeStyles } from '@material-ui/styles';
import {Theme} from "@material-ui/core";

export const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 120,
    [theme.breakpoints.down('md')]: {
      marginBottom: 110,
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: 90,
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  }
}));
