import { makeStyles } from '@material-ui/core/styles';

export const useNavigationSelectorStyles = makeStyles(theme => ({
  empty: {
    '& > div > div': {
      paddingRight: 'unset !important',
      paddingLeft: 'unset !important',
      borderRadius: '50% !important',
      width: '36px !important',
      height: '36px !important',
      padding: '0 !important',
    },
    '& svg': {
      top: 1,
      right: 11,
    },
  },

  darkened: {
    '& > div': {
      color: theme.palette.text.secondary,
      transition: 'color 0.2s',

      '&:hover': {
        color: theme.palette.text.primary,
      },
    },
  },
}));
