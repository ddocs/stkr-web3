import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStakeFormStyles = makeStyles<Theme>(theme => {
  return {
    body: {
      padding: theme.spacing(3, 0),

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(6, 0),
      },
    },

    container: {
      width: '100%',
      margin: 'auto',
      padding: theme.spacing(0, 2),

      [theme.breakpoints.up('sm')]: {
        maxWidth: 800,
        padding: theme.spacing(0, 3),
      },
    },

    title: {
      textAlign: 'left',
      margin: theme.spacing(0, 0, 5.5),

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

    range: {
      display: 'grid',
      gridRowGap: theme.spacing(1),
    },

    label: {
      display: 'flex',
      flexDirection: 'column',

      '&&': {
        [theme.breakpoints.down('xs')]: {
          fontSize: 16,
          fontWeight: 500,
        },
      },

      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(1),
      },
    },

    amount: {
      display: 'grid',
      margin: theme.spacing(2, 0, 1.5),
      fontSize: 38,
      fontWeight: 700,
      gridTemplateColumns: '1fr auto',
      gap: theme.spacing(0, 1),

      [theme.breakpoints.up('sm')]: {
        margin: 0,
        gridTemplateColumns: '150px auto',
      },
    },

    labelText: {
      width: 'max-content',
    },

    inputAmount: {
      color: 'white',
      background: 'transparent',
      outline: 'none',
      border: 'none',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      lineHeight: 1.3,
      padding: 0,
      '-moz-appearance': 'textfield',

      [theme.breakpoints.up('sm')]: {
        textAlign: 'right',
      },

      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
    },

    amountError: {
      textAlign: 'right',
      [theme.breakpoints.down('xs')]: {
        textAlign: 'left',
      },
    },
    earnings: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr 1fr',
      gap: theme.spacing(4, 2),
      margin: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        maxWidth: 800,
      },
    },
    earningsValue: {
      textAlign: 'right',
    },

    footer: {
      paddingTop: theme.spacing(6),
      borderTop: `1px solid ${fade(theme.palette.text.primary, 0.2)}`,
    },

    footerWrapper: {
      display: 'grid',
      gridRowGap: theme.spacing(3),

      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: '1fr minmax(auto, 214px)',
        gridColumnGap: theme.spacing(4),
      },
    },

    info: {
      alignSelf: 'start',
      paddingLeft: theme.spacing(2.5),
      borderLeft: `2px solid ${theme.palette.primary.main}`,

      [theme.breakpoints.down('xs')]: {
        fontSize: 14,
      },
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

    buttonStake: {
      maxWidth: 230,
      height: 54,
      [theme.breakpoints.down('sm')]: {
        maxWidth: 'none',
      },
    },
  };
});
