import { makeStyles } from '@material-ui/styles';
import {Theme} from "@material-ui/core";

export const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    display: 'flex',
    color: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 6,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  divider: {
    margin: '0 22px',
    height: '35px',
    width: 1,
    background: '#FFFFFF',
    [theme.breakpoints.down('xs')]: {
      margin: '0 15px',
    }
  },
  menu: {
    cursor: 'pointer',
    transition: 'color 200ms',
    padding: '10px 0 10px 10px',
    '&:hover': {
      color: '#E6007A',
    },
  }
}));
