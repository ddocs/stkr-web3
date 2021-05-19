import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useConvertSummaryStyles = makeStyles<Theme>(theme => {
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

    container: {
      '&&': {
        [theme.breakpoints.down('xs')]: {
          padding: theme.spacing(0, 2),
        },
      },
    },

    box: {
      position: 'relative',
      padding: 0,
      maxWidth: 900,
      margin: '0 auto',

      [theme.breakpoints.up('lg')]: {
        borderRadius: 65,
      },
    },

    body: {
      padding: theme.spacing(3, 0, 4),

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(6, 0, 8),
      },
    },

    footer: {
      borderTop: `1px solid ${fade(theme.palette.text.primary, 0.2)}`,
      padding: theme.spacing(3.5, 0, 5),

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(6, 0),
      },
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
      textAlign: 'center',
      margin: theme.spacing(0, 0, 5.5),

      [theme.breakpoints.down('xs')]: {
        fontSize: 24,
        marginTop: theme.spacing(6),
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
    subSummary: {
      opacity: 0.5,
      textAlign: 'center',
    },
  };
});
