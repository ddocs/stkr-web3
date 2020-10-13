import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { getImages } from '../../../../common/utils/getImages';
import * as assetsReference from '../Address/assets';

const assets = getImages(assetsReference);

export const useDropdownStyles = makeStyles<
  Theme,
  { currentProvider?: string; provider?: string }
>(theme => ({
  component: {
    minWidth: 320,

    borderRadius: 2,

    opacity: 0,

    transitionTimingFunction: 'linear',
    transitionDuration: '300ms',
    transitionProperty: 'opacity',

    pointerEvents: 'none',
  },

  visible: {
    opacity: 1,

    pointerEvents: 'initial',
  },

  info: {
    display: 'grid',
    gridTemplateRows: 'auto auto auto',
    gridTemplateColumns: '44px 1fr auto',
    gridTemplateAreas:
      '"icon title title" "icon address disconnect" "navigation navigation navigation"',
    gridColumnGap: theme.spacing(1.5),

    width: '100%',
    padding: theme.spacing(3),

    boxSizing: 'border-box',

    borderBottom: `1px solid ${theme.palette.grey[500]}`,

    '&::before': {
      position: 'relative',
      content: '""',

      gridArea: 'icon',

      display: 'block',
      width: 44,
      height: 44,

      backgroundImage: props =>
        props.currentProvider
          ? `url(${assets[props.currentProvider.toLowerCase()]})`
          : undefined,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
    },
  },

  title: {
    gridArea: 'title',

    margin: 0,
    marginBottom: theme.spacing(0.5),
  },

  address: {
    gridArea: 'address',

    fontSize: 14,
    lineHeight: 1.2,
    color: theme.palette.text.secondary,
  },

  disconnect: {
    gridArea: 'disconnect',
  },

  navigation: {
    gridArea: 'navigation',

    marginTop: theme.spacing(3),
  },

  copy: {
    marginRight: theme.spacing(3),

    '& svg': {
      color: 'inherit',
    },
  },

  view: {
    '& svg': {
      color: 'inherit',
    },
  },

  icon: {
    marginRight: theme.spacing(0.5),
  },

  list: {
    margin: 0,
    padding: 0,

    listStyle: 'none',
  },

  item: {
    display: 'grid',
    gridTemplateColumns: '44px 1fr auto',
    gridTemplateAreas: '"image caption select"',
    gridColumnGap: theme.spacing(1.5),
    alignItems: 'center',

    width: '100%',
    padding: theme.spacing(2.5, 3),

    '&::before': {
      position: 'relative',
      content: '""',

      gridArea: 'image',

      display: 'block',
      width: 44,
      height: 44,

      backgroundImage: props =>
        props.provider
          ? `url(${assets[props.provider.toLowerCase()]})`
          : undefined,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
    },
  },

  caption: {
    gridArea: 'caption',
  },

  select: {
    gridArea: 'select',
  },
}));
