import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import { DEFAULT_FONT } from '../../../../common/themes/mainTheme';

export const useDefaultLayoutStyles = makeStyles<Theme>(theme => ({
  component: {
    minHeight: '100vh',
    width: '100%',

    fontFamily: DEFAULT_FONT,
    fontWeight: 400,

    backgroundColor: theme.palette.primary.contrastText,

    '-webkit-backface-visibility': 'hidden',
    '-moz-backface-visibility': 'hidden',

    '-webkit-font-smoothing': 'antialiased',

    '& *': {
      outline: 'none',
      '-webkit-tap-highlight-color': 'transparent',

      '&::-moz-focus-inner': {
        border: 0,
      },
    },
  },
}));
