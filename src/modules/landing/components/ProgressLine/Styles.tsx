import { makeStyles } from '@material-ui/styles';
import {Theme} from "@material-ui/core";

export const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    width: '100%',
    borderTop: '1px solid #ffffff',
    marginTop: 8,
    marginBottom: 5,
  },
  line: {
    height: 3,
    background: '#ffffff',
  },
}));
