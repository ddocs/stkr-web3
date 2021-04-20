import { lighten, makeStyles, Theme } from '@material-ui/core';

export const useSelectStyles = makeStyles<Theme>(theme => ({
  menuPaper: {
    border: '1px solid #E6E6E6',
    marginTop: 5,
    borderRadius: 8,

    '& .MuiListItem-button': {
      paddingRight: theme.spacing(7),
      fontSize: 'inherit',

      '&:hover': {
        background: lighten(theme.palette.primary.main, 0.8),
      },

      '&.Mui-selected': {
        color: '#ccc',
        background: 'none',
        cursor: 'default',

        '&:after': {
          content: `''`,
          position: 'absolute',
          top: 'calc(50% - 5px)',
          right: theme.spacing(2),

          width: 10,
          height: 6,
          border: `solid ${theme.palette.primary.main}`,
          borderWidth: '0 0 2px 2px',
          transform: 'rotate(-45deg)',
        },
      },
    },
  },
}));
