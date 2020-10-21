import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useTableHeadStyles = makeStyles<
  Theme,
  {
    count: number;
    customCell?: string;
    paddingCollapse?: boolean;
  }
>(theme => ({
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
  row: {
    display: 'contents',
  },
}));
