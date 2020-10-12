import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import icon from './assets/icon.svg';

export const useAmountStyles = makeStyles<Theme>(theme => ({
  component: {
    display: 'grid',
    gridTemplateColumns: '100%',
    gridRowGap: theme.spacing(3),
  },

  value: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    margin: 0,

    '&::before': {
      position: 'relative',
      content: '""',

      display: 'block',
      width: 24,
      height: 24,
      marginRight: theme.spacing(1.5),

      backgroundImage: `url("${icon}")`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
    },
  },

  extension: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    marginLeft: theme.spacing(2.5),
  },
}));
