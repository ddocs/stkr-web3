import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { DEFENSE_HEADER_HEIGHT, HEADER_HEIGHT } from './const';

export const TABLE_MIN_WIDTH = 808;

export const useTableStyles = makeStyles<
  Theme,
  {
    count: number;
    customCell?: string;
    paddingCollapse?: boolean;
    defense?: boolean;
  }
>(theme => ({
  container: {},

  table: {
    position: 'relative',

    minWidth: TABLE_MIN_WIDTH,
    height: '100%',
    boxSizing: 'border-box',

    overflow: 'hidden',
  },

  head: {
    display: 'grid',
    gridTemplateColumns: props =>
      props.customCell ? props.customCell : `repeat(${props.count}, 1fr)`,
    alignItems: 'stretch',

    paddingLeft: props => (props.paddingCollapse ? theme.spacing(4) : 0),
    paddingRight: props => (props.paddingCollapse ? theme.spacing(4) : 0),

    boxSizing: 'border-box',

    [theme.breakpoints.down('md')]: {
      paddingLeft: props => (props.paddingCollapse ? theme.spacing(3) : 0),
      paddingRight: props => (props.paddingCollapse ? theme.spacing(3) : 0),
    },

    [theme.breakpoints.down('xs')]: {
      paddingLeft: props => (props.paddingCollapse ? theme.spacing(2) : 0),
      paddingRight: props => (props.paddingCollapse ? theme.spacing(2) : 0),
    },
  },

  bodyWrapper: {
    position: 'relative',

    width: '100%',
    height: props =>
      props.defense
        ? `calc(100% - ${DEFENSE_HEADER_HEIGHT}px)`
        : `calc(100% - ${HEADER_HEIGHT}px)`,
    marginTop: 2,

    paddingLeft: props => (props.paddingCollapse ? theme.spacing(4) : 0),
    paddingRight: props => (props.paddingCollapse ? theme.spacing(4) : 0),

    boxSizing: 'border-box',

    overflow: 'hidden',

    [theme.breakpoints.down('md')]: {
      paddingLeft: props => (props.paddingCollapse ? theme.spacing(3) : 0),
      paddingRight: props => (props.paddingCollapse ? theme.spacing(3) : 0),
    },

    [theme.breakpoints.down('xs')]: {
      paddingLeft: props => (props.paddingCollapse ? theme.spacing(2) : 0),
      paddingRight: props => (props.paddingCollapse ? theme.spacing(2) : 0),
    },
  },

  body: {
    display: 'grid',
    gridTemplateColumns: props =>
      props.customCell ? props.customCell : `repeat(${props.count}, 1fr)`,
    gridRowGap: 2,
    alignItems: 'stretch',

    width: '100%',
  },

  row: {
    display: 'contents',
  },
}));
