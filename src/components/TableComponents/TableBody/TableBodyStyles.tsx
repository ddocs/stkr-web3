import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { DEFENSE_HEADER_HEIGHT, HEADER_HEIGHT } from '../const';

export const useTableBodyStyles = makeStyles<
  Theme,
  {
    count: number;
    customCell?: string;
    paddingCollapse?: boolean;
    defense?: boolean;
  }
>(theme => ({
  bodyWrapper: {
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',

    [theme.breakpoints.up('sm')]: {
      height: props =>
        props.defense
          ? `calc(100% - ${DEFENSE_HEADER_HEIGHT}px)`
          : `calc(100% - ${HEADER_HEIGHT}px)`,
    },
  },

  body: {
    width: '100%',

    [theme.breakpoints.up('sm')]: {
      display: 'grid',
      gridTemplateColumns: props =>
        props.customCell ? props.customCell : `repeat(${props.count}, 1fr)`,
      alignItems: 'stretch',
    },
  },
}));
