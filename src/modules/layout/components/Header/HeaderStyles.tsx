import { fade, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export const useHeaderStyles = makeStyles<Theme>(theme => ({
  component: {
    position: 'relative',
    zIndex: 1,
    padding: theme.spacing(2.5, 0),
    boxSizing: 'border-box',
    borderBottom: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,
  },
  outer: {
    '&&': {
      display: 'grid',
      gridTemplateColumns: '1fr auto 180px',
      justifyContent: 'space-between',
      padding: theme.spacing(0, 8.5),
      [theme.breakpoints.down('lg')]: {
        padding: theme.spacing(0, 5),
      },
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'auto auto',
      },
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(0, 3),
      },
    },
  },
  inner: {
    '&&': {
      display: 'grid',
      gridTemplateColumns: '1fr 190px auto',
      gridColumnGap: theme.spacing(4),
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'auto auto',
        justifyContent: 'space-between',
      },
    },
  },
  tabs: {
    width: '100%',
  },
  wallet: {
    width: 'auto',
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  item: {
    marginRight: theme.spacing(8),
  },
  link: {
    '&&': {
      '&::after': {
        position: 'absolute',
        content: '""',
        bottom: -8,
        left: 0,
        width: '100%',
        height: 2,
        backgroundColor: theme.palette.text.secondary,
        transform: 'scaleX(0)',
        transformOrigin: 'bottom right',
        transitionProperty: 'transform',
        transitionTimingFunction: 'linear',
        transitionDuration: '200ms',
      },
      '&:hover, &:focus': {
        color: theme.palette.text.secondary,
      },
      '&:hover::after, &:focus::after': {
        transform: 'scaleX(1)',
        transformOrigin: 'bottom left',
      },
    },
  },
}));
