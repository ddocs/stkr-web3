import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as assetsReference from '../assets/assets';
import { getImages } from '../../../../common/utils/getImages';
import icon from './assets/check.svg';

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
      '"icon title disconnect" "icon address address" "navigation navigation navigation"',
    gridColumnGap: theme.spacing(1.5),
    width: '100%',
    padding: theme.spacing(3),
    boxSizing: 'border-box',
    '&::before': {
      position: 'relative',
      content: '""',
      gridArea: 'icon',
      display: 'block',
      width: 44,
      height: 44,
      borderRadius: 4,
      backgroundImage: props =>
        props.currentProvider
          ? `url(${assets[props.currentProvider.toLowerCase()]})`
          : undefined,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundColor: '#0F0F0F',
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
    position: 'relative',
    display: 'inline-block',
    marginRight: theme.spacing(3),
  },
  copyAction: {
    '& svg': {
      color: 'inherit',
    },
  },
  copyMessage: {
    position: 'absolute',
    top: theme.spacing(4),
    left: -theme.spacing(3),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing(1, 2.5),
    boxSizing: 'border-box',
    fontSize: 12,
    whiteSpace: 'nowrap',
    background: theme.palette.background.paper,
    border: `1px solid ${fade(theme.palette.text.primary, 0.1)}`,
    borderRadius: 2,
    '&::before': {
      position: 'relative',
      content: '""',
      display: 'block',
      width: 16,
      height: 16,
      marginRight: theme.spacing(1),
      backgroundImage: `url("${icon}")`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
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
    borderTop: `1px solid ${theme.palette.grey[500]}`,
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
      borderRadius: 4,
      backgroundImage: props =>
        props.provider
          ? `url(${assets[props.provider.toLowerCase()]})`
          : undefined,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundColor: '#0F0F0F',
    },
  },
  caption: {
    gridArea: 'caption',
  },
  select: {
    gridArea: 'select',
  },
}));
