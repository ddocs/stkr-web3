import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as assetsReference from '../assets/assets';
import { getImages } from '../../../../common/utils/getImages';

const assets = getImages(assetsReference);

export const useDropdownStyles = makeStyles<
  Theme,
  { currentProvider?: string; provider?: string }
>(theme => ({
  component: {
    minWidth: 327,
    borderRadius: 12,
    opacity: 0,
    transitionTimingFunction: 'linear',
    transitionDuration: '300ms',
    transitionProperty: 'opacity',
    pointerEvents: 'none',
    backgroundColor: '#0F0F0F',
    border: `1px solid ${theme.palette.grey[500]}`,
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
    boxSizing: 'border-box',
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(
      2,
    )}px`,
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
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 65,
    padding: '7px 14px',
  },
  navigation: {
    gridArea: 'navigation',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    borderTop: `1px solid ${theme.palette.grey[500]}`,
  },
  copy: {
    position: 'relative',
    display: 'inline-block',
    marginRight: theme.spacing(3),
  },
  copyAction: {
    minWidth: 105,
    justifyContent: 'left',
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
  copied: {
    marginBottom: -5,
    marginLeft: 2,
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
