import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useClaimStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(4, 3, 3),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 5, 3),
    },

    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderRadius: 65,
    },
  },

  header: {
    fontSize: 20,
    marginBottom: theme.spacing(6),
  },

  footer: {
    display: 'grid',
    gap: theme.spacing(3, 2),

    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr auto auto',
      alignItems: 'end',
    },
  },

  info: {
    alignSelf: 'end',
    paddingLeft: theme.spacing(1.5),
    borderLeft: `2px solid ${theme.palette.primary.main}`,
    textAlign: 'left',
    fontSize: 14,

    [theme.breakpoints.up('sm')]: {
      maxWidth: 175,
    },
  },

  buttonClaim: {
    minWidth: 144,
  },

  amount: {
    display: 'inline-grid',
    gridTemplateColumns: 'auto 1fr',
    gridGap: theme.spacing(1),
    alignItems: 'end',
  },
  amountLabel: {
    fontSize: 36,
    lineHeight: 1,
  },
}));
