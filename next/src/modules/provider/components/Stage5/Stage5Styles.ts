import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStage5Styles = makeStyles<Theme>(theme => ({
  component: {
    display: 'grid',
    gridTemplateRows: 'auto auto 1fr',

    height: '100%',
  },

  title: {
    margin: 0,
  },

  navigation: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginTop: theme.spacing(7.5),
  },

  list: {
    display: 'grid',
    gridColumnGap: theme.spacing(3.5),
    gridTemplateColumns: 'auto auto',

    margin: 0,
    padding: 0,

    listStyle: 'none',
  },

  item: {},

  tab: {
    padding: theme.spacing(2, 0),

    fontFamily: 'inherit',
    fontSize: 18,
    lineHeight: 1.2,
    fontWeight: 700,
    color: fade(theme.palette.text.primary, 0.3),

    border: 0,
    borderBottom: `3px solid transparent`,
    borderRadius: 0,

    backgroundColor: 'transparent',

    cursor: 'pointer',

    '&:hover, &:focus': {
      outline: 'none',
    },
  },

  activeTab: {
    color: theme.palette.primary.main,

    borderColor: 'currentColor',
  },

  create: {
    minWidth: 100,
  },

  table: {
    height: '100%',
  },
}));
