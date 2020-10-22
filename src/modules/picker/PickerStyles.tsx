import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as assetsReference from './assets';
import { getImages } from '../../common/utils/getImages';

const assets = getImages(assetsReference);

export const usePickerStyles = makeStyles<Theme, { icon?: string }>(theme => ({
  component: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(9, 0),

    boxSizing: 'border-box',
  },

  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    height: '100%',
  },

  list: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '100%',
    gridColumnGap: theme.spacing(6.75),

    width: '100%',
    maxWidth: 1094,
    maxHeight: 630,
    height: '100%',
    margin: 'auto',
    padding: 0,

    listStyle: 'none',
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    width: '100%',
    maxWidth: 520,
    padding: theme.spacing(5.5, 8),
    boxSizing: 'border-box',

    '&::before': {
      position: 'relative',
      content: '""',

      display: 'block',
      width: '100%',
      height: 160,

      backgroundImage: props =>
        props.icon ? `url(${assets[props.icon.toLowerCase()]})` : undefined,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto',
    },
  },

  caption: {
    margin: 0,

    textAlign: 'center',
  },

  text: {
    margin: 0,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(7.5),

    textAlign: 'center',
  },

  link: {
    width: '100%',
    maxWidth: 270,
    marginTop: 'auto',
  },
}));
