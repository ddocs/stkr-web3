import { makeStyles } from '@material-ui/core/styles';
import { DEFAULT_FONT } from '../../../../common/themes/mainTheme';

export const useDefaultLayoutStyles = makeStyles(() => ({
  component: {
    display: 'flex',
    flexDirection: 'column',
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
    position: 'relative',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'initial',
    maxWidth: '100vw',
  },
}));
