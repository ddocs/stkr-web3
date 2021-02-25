import { Theme } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

export const useLinksStyles = makeStyles<Theme>(theme => ({
  component: {},
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    listStyle: 'none',

    [theme.breakpoints.up('lg')]: {
      display: 'grid',
      gridAutoFlow: 'column',
      justifyContent: 'center',
      gap: theme.spacing(0, 3),
    },

    [theme.breakpoints.up('xl')]: {
      gap: theme.spacing(0, 8),
    },
  },
  item: {
    position: 'relative',
    width: '100%',
    padding: theme.spacing(2, 0),
    borderBottom: `1px solid ${fade(theme.palette.common.white, 0.2)}`,
    cursor: 'pointer',

    [theme.breakpoints.up('lg')]: {
      width: 'auto',
      padding: 0,
      border: 'none',

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

    '&:last-child': {
      border: 'none',
    },
  },
  link: {
    display: 'block',
    fontSize: 14,

    '&::after': {
      position: 'absolute',
      content: '""',
      bottom: -7,
      left: 0,
      width: '100%',
      height: 1,
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
  button: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',

    [theme.breakpoints.up('lg')]: {
      display: 'inline-flex',
      justifyContent: 'normal',
      width: 'auto',
    },
  },
  arrow: {
    margin: 'auto 0',
    marginLeft: theme.spacing(1.5),

    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  dropdown: {
    position: 'static',
    top: 20,
    zIndex: 2000,
    transitionTimingFunction: 'linear',
    transitionDuration: '300ms',
    transitionProperty: 'z-index, opacity',
    opacity: 1,
    visibility: 'visible',

    [theme.breakpoints.up('lg')]: {
      position: 'absolute',
      opacity: 0,
      visibility: 'hidden',
    },
  },
  subList: {
    margin: 0,
    marginTop: theme.spacing(2.5),
    padding: theme.spacing(4, 0, 2.5),
    listStyle: 'none',
    borderRadius: 4,

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(2, 0),
      backgroundColor: '#181818',
    },
  },
  subItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(4),

    [theme.breakpoints.up('lg')]: {
      display: 'block',
      margin: 0,
    },

    '&:first-child': {
      marginTop: 0,
    },
  },
  subLink: {
    '&&': {
      justifyContent: 'flex-start',
      width: '100%',
      boxSizing: 'border-box',
      transitionTimingFunction: 'linear',
      transitionDuration: '250ms',
      transitionProperty: 'color, background-color',

      [theme.breakpoints.up('lg')]: {
        padding: theme.spacing(1.5, 3.5),
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
