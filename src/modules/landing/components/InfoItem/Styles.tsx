import { makeStyles } from '@material-ui/styles';
import {Theme} from "@material-ui/core";

export const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 20,
    height: 200,
    '&::selection': {
      background: '#E6007A',
      color: '#000000',
    },
    [theme.breakpoints.down('sm')]: {
      height: 105,
    },
    [theme.breakpoints.down('xs')]: {
      height: 110,
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
    },
  },
  value: {
    fontSize: 200,
    textAlign: 'right',
    lineHeight: 1,
    '& div::selection': {
      background: '#E6007A',
      color: '#000000',
    },
    '& div': {
      '& div': {
        maxWidth: 95,
        [theme.breakpoints.down('sm')]: {
          maxWidth: 50,
        },
        [theme.breakpoints.down('xs')]: {
          maxWidth: 36,
        },
      },
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 105,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 75,
    },
  },
  description: {
    fontSize: 15,
    textAlign: 'left',
    width: 230,
    paddingLeft: 20,
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 50,
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 20,
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingBottom: 0,
      width: '100%',
      justifyContent: 'flex-end',
      textAlign: 'right',
      marginTop: -10,
    },
  }
}));
