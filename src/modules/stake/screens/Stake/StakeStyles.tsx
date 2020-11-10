import { makeStyles } from '@material-ui/styles';
import { fade, Theme } from '@material-ui/core';

export const useStakeStyles = makeStyles<Theme>(theme => {
  return {
    component: {
      flexGrow: 1,
      display: 'grid',
      gridTemplateColumns: '100%',
      gridTemplateRows: '100%',
      padding: theme.spacing(8, 0),
      boxSizing: 'border-box',
      [theme.breakpoints.down('lg')]: {
        padding: theme.spacing(6, 0),
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
      paddingTop: theme.spacing(7),
      [theme.breakpoints.down('xs')]: {
        paddingTop: theme.spacing(3.5),
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
      right: 25,
      top: 28,
      [theme.breakpoints.down('xs')]: {
        right: 0,
        top: 0,
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
    list: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gridColumnGap: theme.spacing(4),
      gridRowGap: theme.spacing(7),
      margin: 0,
      marginTop: theme.spacing(8),
      marginBottom: 'auto',
      padding: theme.spacing(0, 20),
      [theme.breakpoints.down('lg')]: {
        gridRowGap: theme.spacing(5.5),
        marginTop: theme.spacing(6),
      },
      [theme.breakpoints.down('md')]: {
        gridRowGap: theme.spacing(3.5),
        marginTop: theme.spacing(4),
        padding: theme.spacing(0, 10),
      },
      [theme.breakpoints.down('sm')]: {
        gridRowGap: theme.spacing(7),
        marginTop: theme.spacing(8),
      },
      [theme.breakpoints.down('xs')]: {
        gridRowGap: theme.spacing(3.5),
        marginTop: theme.spacing(4),
        padding: theme.spacing(0, 2.5),
      },
    },
    term: {
      alignSelf: 'center',
      fontSize: 20,
      [theme.breakpoints.down('xs')]: {
        fontSize: 15,
      },
    },
    description: {
      '&&': {
        justifySelf: 'end',
        alignSelf: 'center',
        [theme.breakpoints.down('xs')]: {
          fontSize: 18,
        },
      },
    },
    question: {
      padding: theme.spacing(1),
    },
    note: {
      [theme.breakpoints.down('xs')]: {
        fontSize: 14,
      },
    },
    footer: {
      display: 'grid',
      gridTemplateColumns: '1fr minmax(auto, 214px)',
      gridColumnGap: theme.spacing(4),
      marginTop: theme.spacing(5),
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
