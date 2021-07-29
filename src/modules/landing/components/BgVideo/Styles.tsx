import { makeStyles } from '@material-ui/styles';
import {Theme} from "@material-ui/core";

export const useStyles = makeStyles<Theme>((theme) => ({
  bgVideo: {
    zIndex: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    '& video': {
      objectFit: 'cover',
      width: '100vw',
      height: '100vh',
    }
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    height: 600,
    width: '100vw',
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);',
    [theme.breakpoints.down('sm')]: {
      height: 392,
    },
    [theme.breakpoints.down('xs')]: {
      height: 380,
      background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,1) 100%)',
    },
  }
}));
