import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DEFAULT_FONT, selection } from '../../../../common/themes/mainTheme';

export const useCalculateStyles = makeStyles<Theme>(theme => ({
  component: {},

  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.05fr',
    gridTemplateRows: 'auto auto',
    gridRowGap: theme.spacing(6.25),
    gridColumnGap: theme.spacing(9),

    fontFamily: DEFAULT_FONT,
  },

  title: {
    alignSelf: 'flex-end',
    margin: 0,

    fontSize: 77,
    lineHeight: 1.2,
    fontWeight: 500,

    '&::selection': selection,

    '& *::selection': selection,

    '& span span': {
      color: theme.palette.primary.main,
    },
  },

  form: {
    gridColumn: '2/3',
    gridRow: '-1/1',
    placeSelf: 'center',

    width: '100%',
    padding: theme.spacing(7.5),

    boxSizing: 'border-box',
  },

  label: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& span': {
      fontSize: 24,
      lineHeight: 1.5,
      fontWeight: 500,
      color: theme.palette.text.secondary,
    },
  },

  range: {
    marginTop: theme.spacing(5),
  },

  list: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    justifyContent: 'space-between',

    margin: 0,
    marginTop: theme.spacing(7.5),
    padding: 0,

    listStyle: 'none',
  },

  item: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridRowGap: theme.spacing(3),

    fontSize: 24,
    lineHeight: 1.5,
    fontWeight: 500,

    color: theme.palette.primary.main,
  },

  caption: {
    gridColumn: '-1/1',

    color: theme.palette.text.primary,
  },

  value: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    fontSize: 24,
    lineHeight: 1.5,
    fontWeight: 500,
    color: theme.palette.text.secondary,

    '&::after': {
      position: 'relative',
      content: '""',

      display: 'block',
      width: 1,
      height: 26,
      margin: theme.spacing(0, 2),

      backgroundColor: 'currentColor',
    },
  },

  unlock: {
    minWidth: 218,
    placeSelf: 'flex-start',
  },
}));
