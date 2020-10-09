import { makeStyles } from '@material-ui/styles';
import { fade, Theme } from '@material-ui/core';
import { DEFENSE_HEADER_HEIGHT, HEADER_HEIGHT } from '../const';
import icon from '../TableRow/assets/triangle.svg';

export const useTableBodyCellStyles = makeStyles<
  Theme,
  {
    defense?: boolean;
    paddingCollapse?: boolean;
    on?: boolean;
    tableWidth: number;
  }
>(theme => ({
  cell: {
    display: 'inline-grid',
    alignItems: 'center',

    paddingLeft: theme.spacing(4.5),
    paddingRight: theme.spacing(4.5),

    fontWeight: 400,
    textAlign: 'left',

    '&:first-child': {
      paddingLeft: props => (props.paddingCollapse ? 0 : theme.spacing(3.75)),
    },

    '&:last-child': {
      paddingRight: props => (props.paddingCollapse ? 0 : theme.spacing(3.75)),
    },

    '&$centerCell': {
      textAlign: 'center',
    },

    '&$leftCell': {
      textAlign: 'left',
    },

    '&$rightCell': {
      textAlign: 'right',
    },
  },

  headCell: {
    minHeight: props => (props.defense ? DEFENSE_HEADER_HEIGHT : HEADER_HEIGHT),

    paddingTop: props =>
      props.defense ? theme.spacing(0.75) : theme.spacing(1.5),
    paddingBottom: props =>
      props.defense ? theme.spacing(0.75) : theme.spacing(1.5),

    boxSizing: 'border-box',

    fontSize: 12,
    lineHeight: 1.5,
    color: theme.palette.text.secondary,
  },

  bodyCell: {
    paddingTop: props =>
      props.defense ? theme.spacing(0.75) : theme.spacing(3.5),
    paddingBottom: props =>
      props.defense ? theme.spacing(0.75) : theme.spacing(3.5),

    fontSize: 16,
    lineHeight: 1.3,
    color: fade(theme.palette.text.secondary, 0.7),
  },

  centerCell: {},

  leftCell: {},

  rightCell: {},

  cellWrapper: {
    width: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  tableCell: {
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
