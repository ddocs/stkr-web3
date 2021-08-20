import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useClaimFormStyles = makeStyles<Theme>(theme => {
  return {
    root: {
      flexGrow: 1,
      display: 'grid',
      gridTemplateColumns: '100%',
      gridTemplateRows: '100%',
      padding: theme.spacing(5, 0),
      boxSizing: 'border-box',

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(8, 0, 5),
      },
    },

    footer: {
      borderTop: `1px solid ${fade(theme.palette.text.primary, 0.2)}`,
      paddingTop: theme.spacing(4),
      marginTop: theme.spacing(7),
    },

    footerWrapper: {
      display: 'flex',
      justifyContent: 'center',
    },

    title: {
      textAlign: 'left',
      margin: theme.spacing(0, 0, 2),

      [theme.breakpoints.down('xs')]: {
        fontSize: 24,
      },

      [theme.breakpoints.up('sm')]: {
        textAlign: 'center',
        marginBottom: theme.spacing(10),
      },
    },

    cancel: {
      position: 'absolute',
      top: 15,
      right: 10,

      [theme.breakpoints.up('sm')]: {
        right: 24,
        top: 24,
      },

      '& svg': {
        display: 'block',
      },
    },

    submit: {
      width: 230,
      height: 54,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },

    range: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      display: 'block',
    },
    label: {
      fontSize: 18,
      fontWeight: 500,
    },
    warning: {
      alignSelf: 'start',
      paddingLeft: theme.spacing(2.5),
      borderLeft: `2px solid ${theme.palette.error.main}`,
      margin: theme.spacing(5),

      [theme.breakpoints.down('xs')]: {
        fontSize: 14,
      },
    },

    info: {
      paddingLeft: theme.spacing(2),
      borderLeft: `2px solid ${theme.palette.primary.main}`,
    },
  };
});
