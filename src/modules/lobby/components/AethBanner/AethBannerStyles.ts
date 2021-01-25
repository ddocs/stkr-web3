import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useAethBannerStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(0, 0, 10),
  },

  box: {
    padding: theme.spacing(5, 3.5),
    border: `1px solid ${fade('#fff', 0.2)}`,
    borderRadius: 63,
    transition: 'border 0.2s',

    display: 'grid',
    gridTemplateAreas: `
      'title'
      'text'
      'link'
    `,

    color: theme.palette.text.primary,
    textDecoration: 'none',

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(7.5, 8),
      gridTemplateColumns: '1fr auto',
      gridTemplateAreas: `
        'title link'
        'text link'
      `,
      gap: theme.spacing(2, 5),
    },

    '&:hover': {
      borderColor: fade('#fff', 0.4),
      color: theme.palette.text.primary,
    },
  },

  title: {
    gridArea: 'title',
    marginBottom: theme.spacing(2),
  },

  text: {
    gridArea: 'text',
    opacity: 0.9,
    marginBottom: theme.spacing(6.5),

    [theme.breakpoints.up('sm')]: {
      marginBottom: 0,
    },
  },

  linkWrap: {
    gridArea: 'link',
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
  },

  btnMobile: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  btnLabel: {
    display: 'none',

    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  btn: {
    display: 'none',
    width: 58,
    height: 58,
    minWidth: 0,
    marginLeft: theme.spacing(3),
    padding: 0,
    borderRadius: '50%',

    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
}));
