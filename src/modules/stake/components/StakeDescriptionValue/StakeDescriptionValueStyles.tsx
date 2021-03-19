import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStakeDescriptionValueStyles = makeStyles<Theme>(theme => ({
  root: {
    '&&': {
      justifySelf: 'end',
      alignSelf: 'center',
      [theme.breakpoints.down('xs')]: {
        fontSize: 18,
      },
    },
  },
}));
