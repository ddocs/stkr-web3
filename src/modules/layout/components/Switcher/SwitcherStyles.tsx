import { makeStyles } from '@material-ui/core/styles';

export const useNavigationSelectorStyles = makeStyles(theme => ({
  empty: {
    '& .MuiSelect-selectMenu': {
      paddingRight: 'unset !important',
      paddingLeft: 'unset !important',
      borderRadius: '50% !important',
      width: '36px !important',
      height: '36px !important',
      padding: '0 !important',
    },
    '& .MuiSelect-icon': {
      top: 2,
      right: 12,
    },
  },

  darkened: {
    '& .MuiInput-root': {
      color: theme.palette.text.secondary,
      transition: 'color 0.2s',

      '&:hover, &.Mui-focused': {
        color: theme.palette.text.primary,
      },
    },
  },
}));
