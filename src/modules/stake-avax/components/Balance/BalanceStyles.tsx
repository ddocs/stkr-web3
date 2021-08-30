import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useBalanceStyles = makeStyles<Theme>(theme => {
  return {
    root: {
      padding: theme.spacing(4, 3, 3),

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(5, 5, 3),
      },

      [theme.breakpoints.up('lg')]: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 65,
      },
    },

    footer: {
      display: 'grid',
      gridTemplateColumns: 'auto auto',
      gridGap: theme.spacing(2),
      alignItems: 'end',
    },

    info: {
      fontSize: 15,
      borderLeft: `2px solid ${theme.palette.primary.main}`,
      paddingLeft: theme.spacing(1.5),

      [theme.breakpoints.up('lg')]: {
        maxWidth: 200,
      },
    },
  };
});
