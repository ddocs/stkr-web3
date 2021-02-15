import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useServicesLogoStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'inline-block',
  },

  svg: {
    display: 'block',
    height: '1em',
    width: 'auto',
  },
}));
