import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useProviderDashboardStyles = makeStyles<Theme>(theme => ({
  component: {
    height: '100%',
    padding: theme.spacing(6, 0),
    boxSizing: 'border-box',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'initial',
    height: '100%',
  },
  navigation: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1fr auto',
    gridTemplateAreas: `
      'tabs link'
      'balance balance'
    `,
    gap: theme.spacing(1.5, 0),
    flexShrink: 0,
    marginBottom: theme.spacing(5),

    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr auto auto',
      gap: 0,
      gridTemplateAreas: `'tabs balance link'`,
      marginBottom: 0,
    },
  },
  tabs: {
    gridArea: 'tabs',
  },
  link: {
    gridArea: 'link',

    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
    },
  },
  linkTextShort: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  linkTextFull: {
    display: 'none',

    [theme.breakpoints.up('sm')]: {
      display: 'inline',
    },
  },
  create: {
    minWidth: 170,
  },
  table: {
    flexGrow: 1,
  },
  balance: {
    gridArea: 'balance',
    padding: theme.spacing(0.6, 1),
    border: `1px solid ${fade(theme.palette.common.white, 0.2)}`,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 500,
    color: fade(theme.palette.common.white, 0.5),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(1, 2),
    },
  },
}));
