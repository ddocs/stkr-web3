import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useTableBodyCellStyles = makeStyles<
  Theme,
  {
    defense?: boolean;
    paddingCollapse?: boolean;
    on?: boolean;
  }
>(theme => ({
  cell: {
    display: 'grid',
    gridTemplateColumns: '0.4fr 0.6fr',
    gap: theme.spacing(0, 2),
    fontWeight: 400,
    textAlign: 'right',

    [theme.breakpoints.up('sm')]: {
      display: 'inline-grid',
      gridTemplateColumns: 'auto',
      gap: 0,
      alignItems: 'center',
      paddingLeft: theme.spacing(4.5),
      paddingRight: theme.spacing(4.5),
      textAlign: 'left',
      borderBottom: `1px solid ${fade(theme.palette.common.white, 0.2)}`,
    },

    '&::before': {
      content: 'attr(data-label)',
      display: 'block',
      maxWidth: '100%',
      fontSize: 14,
      color: theme.palette.text.secondary,
      textAlign: 'left',

      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',

      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },

    '&:first-child': {
      [theme.breakpoints.up('sm')]: {
        paddingLeft: props => (props.paddingCollapse ? 0 : theme.spacing(3.75)),
      },
    },

    '&:last-child': {
      [theme.breakpoints.up('sm')]: {
        paddingRight: props =>
          props.paddingCollapse ? 0 : theme.spacing(3.75),
      },
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

  bodyCell: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    fontSize: 16,
    lineHeight: 1.3,
    color: theme.palette.common.white,

    [theme.breakpoints.up('sm')]: {
      paddingTop: props =>
        props.defense ? theme.spacing(0.75) : theme.spacing(2.5),
      paddingBottom: props =>
        props.defense ? theme.spacing(0.75) : theme.spacing(2.5),

      minHeight: props => (props.defense ? 0 : theme.spacing(10)),
    },
  },

  centerCell: {},
  leftCell: {},
  rightCell: {},

  cellWrapper: {
    width: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    fontSize: 14,
  },

  tableCell: {
    position: 'relative',
    transitionTimingFunction: 'linear',
    transitionDuration: '200ms',
    transitionProperty: 'background-color',
  },
}));
