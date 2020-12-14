import { fade, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export const useLinksStyles = makeStyles<Theme>(theme => ({
  component: {},
  list: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    listStyle: 'none',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  item: {
    position: 'relative',
    marginRight: theme.spacing(4),
    cursor: 'pointer',
    [theme.breakpoints.up('lg')]: {
      marginRight: theme.spacing(8),
    },
    [theme.breakpoints.up('md')]: {
      '&:hover, &:focus': {
        '& $dropdown': {
          opacity: 1,
          visibility: 'visible',
        },
        '& $link': {
          color: theme.palette.text.secondary,
          outline: 'none',
        },
        '& $link:not(.Mui-disabled)::after': {
          transform: 'scaleX(1)',
          transformOrigin: 'bottom left',
        },
      },
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: 0,
      padding: theme.spacing(2, 0),

      borderTop: `1px solid ${theme.palette.text.secondary}`,
    },
  },
  link: {
    '&&': {
      fontWeight: 500,
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
      '&.Mui-disabled': {
        color: fade(theme.palette.text.primary, 0.5),
        pointerEvents: 'auto',
      },
    },
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },
  },
  arrow: {
    margin: 'auto 0',
    marginLeft: theme.spacing(1.5),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  dropdown: {
    position: 'absolute',
    top: 20,
    zIndex: 2000,
    opacity: 0,
    transitionTimingFunction: 'linear',
    transitionDuration: '300ms',
    transitionProperty: 'z-index, opacity',
    visibility: 'hidden',
    [theme.breakpoints.down('sm')]: {
      position: 'static',
      opacity: 1,
      visibility: 'visible',
    },
  },
  subList: {
    margin: 0,
    marginTop: theme.spacing(2.5),
    padding: theme.spacing(2, 0),
    listStyle: 'none',
    backgroundColor: '#181818',
    borderRadius: 4,
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      padding: theme.spacing(4, 0, 2.5),
      backgroundColor: 'transparent',
    },
  },
  subItem: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: theme.spacing(4),
    },
    '&:first-child': {
      marginTop: 0,
    },
  },
  subLink: {
    '&&': {
      justifyContent: 'flex-start',
      width: '100%',
      padding: theme.spacing(1.5, 3.5),
      boxSizing: 'border-box',
      transitionTimingFunction: 'linear',
      transitionDuration: '250ms',
      transitionProperty: 'color, background-color',
      [theme.breakpoints.down('sm')]: {
        padding: 0,
      },
      '&:hover, &:focus': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
      },
      '& svg': {
        width: 24,
        height: 24,
        marginRight: theme.spacing(2),
      },
    },
  },
}));
