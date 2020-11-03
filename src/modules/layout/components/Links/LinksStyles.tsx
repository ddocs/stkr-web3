import { makeStyles } from '@material-ui/core/styles';
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
  },
  item: {
    position: 'relative',
    marginRight: theme.spacing(8),
    cursor: 'pointer',
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
        '& $link::after': {
          transform: 'scaleX(1)',
          transformOrigin: 'bottom left',
        },
      },
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
    [theme.breakpoints.down('md')]: {
      position: 'static',
    },
  },
  subList: {
    margin: 0,
    marginTop: theme.spacing(2.5),
    padding: theme.spacing(2, 0),
    listStyle: 'none',
    backgroundColor: '#181818',
    borderRadius: 4,
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
