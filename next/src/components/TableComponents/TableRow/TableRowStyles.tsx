import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

import icon from './assets/triangle.svg';

export const useRowStyles = makeStyles<
  Theme,
  {
    count: number;
    customCell?: string;
    tableWidth: number;
    paddingCollapse?: boolean;
  }
>(theme => ({
  row: {},

  rowHovered: {
    position: 'relative',

    textDecoration: 'none',

    '&:hover $cell:first-child::after': {
      height: '100%',
    },
  },

  cell: {
    position: 'relative',

    transitionTimingFunction: 'linear',
    transitionDuration: '200ms',
    transitionProperty: 'background-color',

    '&:first-child::before': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      zIndex: -1,
      content: '""',

      display: 'block',
      width: props =>
        props.paddingCollapse
          ? props.tableWidth - theme.spacing(8)
          : props.tableWidth,

      transitionTimingFunction: 'linear',
      transitionDuration: '200ms',
      transitionProperty: 'box-shadow',

      [theme.breakpoints.down('md')]: {
        width: props =>
          props.paddingCollapse
            ? props.tableWidth - theme.spacing(6)
            : props.tableWidth,
      },

      [theme.breakpoints.down('xs')]: {
        width: props =>
          props.paddingCollapse
            ? props.tableWidth - theme.spacing(4)
            : props.tableWidth,
      },
    },

    '&:first-child::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      content: '""',

      display: 'block',
      width: 2,
      height: 0,

      transitionTimingFunction: 'linear',
      transitionDuration: '200ms',
      transitionProperty: 'height',
    },

    '&:last-child::after': {
      position: 'absolute',
      top: '50%',
      right: theme.spacing(2),
      content: '""',

      display: 'none',
      width: 8,
      height: 6,

      backgroundImage: `url("${icon}")`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',

      transitionTimingFunction: 'linear',
      transitionDuration: '200ms',
      transitionProperty: 'transform',

      [theme.breakpoints.down('md')]: {
        right: theme.spacing(1.5),
      },

      [theme.breakpoints.down('xs')]: {
        right: theme.spacing(1),
      },
    },
  },
}));
