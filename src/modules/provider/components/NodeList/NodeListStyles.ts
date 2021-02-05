import { Theme } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

export const useNodeListStyles = makeStyles<Theme>(theme => ({
  table: {
    width: '100%',
  },

  tableCell: {
    opacity: 0,
    animationName: '$fadeIn',
    animationDuration: '0.5s',
    animationFillMode: 'forwards',
  },

  icon: {
    padding: 0,
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    '&.Mui-disabled': {
      opacity: 0.5,
    },
  },
  noticeWrapper: {
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(12.5),
  },
  icons: {
    '&&': {
      whiteSpace: 'normal',
    },
  },

  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
}));
