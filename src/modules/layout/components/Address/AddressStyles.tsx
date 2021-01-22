import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getImages } from '../../../../common/utils/getImages';
import * as assetsReference from '../assets/assets';

const assets = getImages(assetsReference);

export const useAddressStyles = makeStyles<Theme, { type: string }>(theme => ({
  component: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    fontsize: 14,
    lineHeight: 1.2,
    color: theme.palette.text.secondary,

    '&::before': {
      position: 'relative',
      content: '""',

      display: 'block',
      width: 28,
      height: 28,
      marginRight: theme.spacing(1),

      backgroundImage: props =>
        props.type ? `url(${assets[props.type.toLowerCase()]})` : undefined,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
    },
  },
}));
