import { makeStyles } from '@material-ui/core/styles';
import { DEFAULT_FONT } from '../../../../common/themes/mainTheme';

export const useDefaultLayoutStyles = makeStyles(() => ({
  component: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    minHeight: '100vh',
    width: '100%',
    fontFamily: DEFAULT_FONT,
    fontWeight: 400,
    backgroundColor: '#0F0F0F',
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
  content: {
    maxWidth: '100vw',
    position: 'relative',
  },
}));
