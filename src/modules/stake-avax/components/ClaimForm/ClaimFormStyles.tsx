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

    networksContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(5),
    },
    network: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: `${theme.spacing(3)}px`,
      padding: theme.spacing(3.5, 8, 3.5, 3.5),
      alignItems: 'center',
      fontWeight: 500,
      fontSize: 18,
      lineHeight: '130%',
      maxWidth: 300,
      cursor: 'pointer',
      '&.selected': {
        background: 'rgba(96, 96, 96, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
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
    disabled: {
      opacity: 0.5,
      cursor: 'default',
    },
  };
});
