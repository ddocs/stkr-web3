import { fade, makeStyles, Theme } from '@material-ui/core/styles';

export const useConnectStyles = makeStyles<Theme>(theme => {
  return {
    root: {
      textAlign: 'center',
      padding: theme.spacing(7.5, 3),
      margin: theme.spacing(6, 3),

      [theme.breakpoints.up('sm')]: {
        width: 580,
        margin: theme.spacing(15, 'auto', 0),
      },
    },

    headerContainer: {
      margin: theme.spacing(0, 0, 3),
    },

    question: {
      margin: theme.spacing(0, 0, 7),
      fontSize: 16,
    },

    button: {
      height: 52,
      margin: theme.spacing(0, 0, 3),

      [theme.breakpoints.up('sm')]: {
        maxWidth: 262,
      },
    },

    info: {
      fontSize: 16,
      margin: '0 auto',

      [theme.breakpoints.up('sm')]: {
        maxWidth: 262,
      },

      '& .highlight': {
        color: theme.palette.text.primary,
      },
    },

    networksWrapper: {
      borderTop: `1px solid ${fade(theme.palette.common.white, 0.2)}`,
      margin: theme.spacing(4, -3, 0),
      padding: theme.spacing(3.5, 3, 0),
    },
  };
});
