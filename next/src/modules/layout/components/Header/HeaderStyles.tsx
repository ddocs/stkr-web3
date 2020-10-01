import { fade, makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export const useHeaderStyles = makeStyles<Theme>(theme => ({
  component: {
    padding: theme.spacing(2.5, 0),
    boxSizing: 'border-box',

    borderBottom: `1px solid ${fade(theme.palette.grey[100], 0.1)}`,
  },

  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 190px 240px',
    gridColumnGap: theme.spacing(4),
  },

  logo: {
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

  tabs: {},

  wallet: {},
}));
