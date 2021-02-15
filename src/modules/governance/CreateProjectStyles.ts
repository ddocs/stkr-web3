import { makeStyles } from '@material-ui/core/styles';

const PADDING_XS = 2.5;
const PADDING_SM = 10;
const PADDING_MD = 20;

export const useCreateProjectStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(4, 0, 7),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3, 0, 10),
    },
  },

  content: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },

  paper: {
    padding: theme.spacing(5, PADDING_XS, 4),
    margin: theme.spacing(0, -1),

    [theme.breakpoints.up('sm')]: {
      width: '100%',
      maxWidth: 955,
      padding: theme.spacing(9, PADDING_SM),
      margin: 0,
    },

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(9, PADDING_MD),
    },
  },

  titleMobile: {
    margin: theme.spacing(0, 0, 6),
    fontSize: 24,

    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  titleTablet: {
    display: 'none',

    [theme.breakpoints.up('sm')]: {
      display: 'block',
      margin: theme.spacing(0, 0, 4),
    },
  },

  divider: {
    margin: theme.spacing(5, -PADDING_XS),

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(7, -PADDING_SM),
    },

    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(7, -PADDING_MD),
    },
  },

  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  tooltip: {
    padding: '4px 25px',
    margin: theme.spacing(0, 0, 1.5),

    background: 'transparent',
    fontSize: 20,
    fontWeight: 'bold',
  },

  closeLink: {
    display: 'none',

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 0, 1),
      display: 'block',
      alignSelf: 'flex-end',
    },
  },

  closeBtn: {
    padding: 0,
  },

  btnWrap: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: 280,
      margin: '0 auto',
    },
  },
}));
