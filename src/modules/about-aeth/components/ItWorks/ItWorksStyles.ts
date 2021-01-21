import { fade, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getPercentage } from '../../../../common/utils/styleUtils';

const mobileItemHeight = '70vh';
const tabletItemHeight = '60vh';

export const useItWorksStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(4, 0),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 0, 12),
    },
  },

  title: {
    textAlign: 'center',
    margin: theme.spacing(0, 0, 3),

    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 0, 8),
    },
  },

  scrollContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: 'nowrap',
  },

  content: {
    flexGrow: 1,

    [theme.breakpoints.up('lg')]: {
      position: 'sticky',
      top: 'calc(50vh - 280px)',
    },
  },

  imgWrap: {
    position: 'relative',
    maxHeight: '23vh',

    [theme.breakpoints.up('sm')]: {
      maxHeight: '30vh',
    },

    [theme.breakpoints.up('lg')]: {
      maxHeight: 'none',
    },

    '&::before': {
      content: `''`,
      display: 'block',
      paddingTop: getPercentage(405, 713),
    },
  },

  imgWrapDesktopUp: {
    display: 'none',

    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
  },

  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'scale-down',

    [theme.breakpoints.up('lg')]: {
      opacity: 0,
      visibility: 'hidden',
      transition: 'all 0.3s ease',
    },
  },

  imgActive: {
    opacity: 1,
    visibility: 'visible',
  },

  spacers: {
    margin: theme.spacing(8, 0, 0),
    padding: 0,
    width: 1,
    display: 'grid',
    gap: theme.spacing(3, 0),

    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(15, 0, 0),
    },

    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
  },

  spacerItem: {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: mobileItemHeight,

    [theme.breakpoints.up('sm')]: {
      height: tabletItemHeight,
    },

    [theme.breakpoints.up('lg')]: {
      height: '50vh',
    },
  },

  spacerTrigger: {
    height: '30vh',
    width: '100%',
  },

  contentGrid: {
    [theme.breakpoints.up('lg')]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: theme.spacing(0, 3),
    },
  },

  nav: {
    display: 'none',

    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },

    [theme.breakpoints.up('xl')]: {
      marginTop: theme.spacing(5),
    },
  },

  mobileContent: {
    position: 'relative',
    display: 'grid',
    gap: theme.spacing(3, 0),

    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },

  item: {
    position: 'sticky',
    top: 10,
    height: mobileItemHeight,
    border: `1px solid ${fade('#fff', 0.1)}`,
    padding: theme.spacing(3, 2.8),
    borderRadius: 48,
    background: theme.palette.background.default,
    transition: 'all 0.3s',

    [theme.breakpoints.up('sm')]: {
      height: tabletItemHeight,
    },

    [theme.breakpoints.up('lg')]: {
      height: 'auto',
    },

    '&::after': {
      content: `''`,
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      background: fade(theme.palette.background.default, 0.5),
      opacity: 0,
      visibility: 'hidden',
      transition: 'all 0.3s',
    },
  },

  itemActive: {},

  itemViewed: {
    transform: 'scale(0.9)',

    '&::after': {
      opacity: 1,
      visibility: 'visible',
    },
  },

  itemNotViewed: {},

  itemContent: {
    flexGrow: 1,
  },

  itemTitle: {
    fontSize: 24,
    margin: theme.spacing(3.5, 0, 2),
  },
}));
