import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStakeFormStyles = makeStyles<Theme>(theme => {
  return {
    component: {
      flexGrow: 1,
      display: 'grid',
      gridTemplateColumns: '100%',
      gridTemplateRows: '100%',
      padding: theme.spacing(8, 0, 5),
      boxSizing: 'border-box',
      [theme.breakpoints.down('lg')]: {
        padding: theme.spacing(6, 0, 3),
      },
      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(4, 0),
      },
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(1.5, 0),
      },
    },
    wrapper: {
      '&&': {
        flexGrow: 1,
        display: 'grid',
        gridTemplateColumns: '100%',
        gridTemplateRows: '100%',
        [theme.breakpoints.down('xs')]: {
          padding: theme.spacing(0, 1.5),
        },
      },
    },
    content: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '100%',
      gridTemplateRows: 'auto 1fr',
      paddingTop: theme.spacing(6),

      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(7),
      },
    },
    title: {
      '&&': {
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
          padding: theme.spacing(0, 2.5),
          fontSize: 28,
          textAlign: 'left',
        },
      },
    },
    cancel: {
      position: 'absolute',
      right: 5,
      top: 5,

      [theme.breakpoints.up('sm')]: {
        right: 25,
        top: 28,
      },
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(5),
    },
    range: {
      display: 'grid',
      gridRowGap: theme.spacing(1),
      width: '100%',
      marginTop: 'auto',
      padding: theme.spacing(0, 20),
      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(0, 10),
      },
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(0, 2.5),
      },
    },
    label: {
      '&&': {
        display: 'inline-flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
          flexDirection: 'column',
          fontSize: 16,
          fontWeight: 500,
        },
      },
    },
    amount: {
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(2),
        fontSize: 38,
        fontWeight: 700,
      },
    },
    amountError: {
      textAlign: 'right',
      [theme.breakpoints.down('xs')]: {
        textAlign: 'left',
      },
    },
    footer: {
      display: 'grid',
      gridTemplateColumns: '1fr minmax(auto, 214px)',
      gridColumnGap: theme.spacing(4),
      marginTop: theme.spacing(8),
      padding: theme.spacing(5.5, 20),
      borderTop: `1px solid ${fade(theme.palette.text.primary, 0.2)}`,
      [theme.breakpoints.down('lg')]: {
        padding: theme.spacing(3.5, 20),
      },
      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(2.5, 10),
      },
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '100%',
        gridRowGap: theme.spacing(4),
        padding: theme.spacing(5.5, 10),
      },
      [theme.breakpoints.down('xs')]: {
        gridRowGap: theme.spacing(2.5),
        marginTop: theme.spacing(4),
        padding: theme.spacing(4, 2.5),
      },
    },
    checkboxLabel: {
      '&&': {
        marginLeft: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
          fontSize: 14,
        },
      },
    },
    submit: {
      maxWidth: 230,
      height: 54,
      [theme.breakpoints.down('sm')]: {
        maxWidth: 'none',
      },
    },
  };
});
