import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import { getImages } from '../../../../common/utils/getImages';
import * as assetsReference from './assets';

const assets = getImages(assetsReference);

export const useAddressStyles = makeStyles<Theme, { type: string }>(theme => ({
  component: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    fontsize: 14,
    lineHeight: 1.2,
    color: theme.palette.text.secondary,

    '&::after': {
      position: 'relative',
      content: '""',

      display: 'block',
      width: 28,
      height: 28,
      marginLeft: theme.spacing(1.5),

      backgroundImage: props =>
        props.type ? `url(${assets[props.type.toLowerCase()]})` : undefined,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
    },
  },
}));
