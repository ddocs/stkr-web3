import { Theme } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

export const useNodeListStyles = makeStyles<Theme>(
  theme => ({
    table: {
      width: '100%',
    },

    tableCell: {
      opacity: 0,
      animationName: '$cellAnimation',
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

    '@keyframes cellAnimation': {
      '0%': {
        opacity: 0,
        transform: 'scale(0.95)',
      },
      '100%': {
        opacity: 1,
        transform: 'scale(1)',
      },
    },
  }),
  { index: 1 },
);
