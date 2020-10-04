import { fade, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export const useLogotypeStyles = makeStyles<Theme>(theme => ({
  component: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    gridTemplateAreas: '"link divider company"',
    gridColumnGap: theme.spacing(2.5),
    alignItems: 'center',

    margin: 0,
    marginRight: 'auto',

    '&::before': {
      position: 'relative',
      content: '""',

      gridArea: 'divider',

      display: 'block',
      width: 1,
      height: theme.spacing(4.5),

      backgroundColor: fade(theme.palette.text.primary, 0.1),
    },
  },

  link: {
    gridArea: 'link',
    width: 103,

    '& svg': {
      width: '100%',
      height: 'auto',
    },
  },

  active: {
    pointerEvents: 'none',
  },
}));
