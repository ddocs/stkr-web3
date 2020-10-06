import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useNotProviderYetStyles = makeStyles<Theme>(theme => ({
  component: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',

    height: '100%',
  },

  header: {
    padding: theme.spacing(4, 0),

    backgroundColor: '#000000',
  },

  breadcrumbs: {},

  list: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: '100%',

    margin: 0,
    padding: 0,

    listStyle: 'none',
    counterReset: 'breadcrumbs',
  },

  item: {
    color: fade(theme.palette.text.primary, 0.3),
    counterIncrement: 'breadcrumbs',

    transitionTimingFunction: 'linaer',
    transitionDuration: '300ms',
    transitionProperty: 'color',

    '&::before': {
      position: 'relative',
      content: '"0" counter(breadcrumbs)". "',
    },
  },

  activeStage: {
    color: theme.palette.primary.main,
  },

  loadingStage: {
    flexGrow: 1,
    margin: theme.spacing(0, 1.5),

    height: 1,
    marginTop: 1,

    backgroundColor: 'currentColor',

    counterIncrement: 'none',

    '&::before': {
      display: 'none',
    },
  },

  finishedStage: {
    color: fade(theme.palette.primary.main, 0.3),
  },

  lastStage: {
    '&::before': {
      display: 'none',
    },
  },

  content: {
    padding: theme.spacing(5, 0),

    boxSizing: 'border-box',
  },

  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    height: '100%',
  },
}));
