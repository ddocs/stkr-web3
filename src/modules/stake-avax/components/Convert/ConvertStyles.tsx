import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useConvertStyles = makeStyles<Theme>(theme => {
  return {
    root: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(5, 5, 3),
      margin: `${theme.spacing(5)}px 180px`,
      [theme.breakpoints.down('lg')]: {
        margin: theme.spacing(5, 10),
      },
    },
    header: {
      fontSize: 20,
      textAlign: 'left',
      marginBottom: theme.spacing(6),
    },
    footer: {
      display: 'flex',
    },
    button: {
      minWidth: 144,
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      marginLeft: theme.spacing(3),
    },
    close: {
      position: 'absolute',

      [theme.breakpoints.up('xs')]: {
        right: theme.spacing(1),
        top: theme.spacing(1),
      },
      [theme.breakpoints.up('sm')]: {
        right: theme.spacing(3),
        top: theme.spacing(3),
      },
    },
    dialogRoot: {
      backgroundColor: theme.palette.background.default,
      '&&': {
        padding: theme.spacing(6, 0),
      },
    },
    dialogFooter: {
      borderTop: `1px solid ${fade(theme.palette.text.primary, 0.2)}`,
      paddingTop: theme.spacing(6),
    },

    wrapper: {
      padding: theme.spacing(0, 2.5),

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(0, 5),
        maxWidth: 720,
        margin: '0 auto',
      },
    },

    footerWrapper: {
      display: 'flex',
      justifyContent: 'center',
    },

    title: {
      textAlign: 'left',
      margin: theme.spacing(2, 0),

      [theme.breakpoints.down('xs')]: {
        fontSize: 24,
      },

      [theme.breakpoints.up('sm')]: {
        textAlign: 'center',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
      },
    },
  };
});
