import { fade, makeStyles } from '@material-ui/core/styles';

export const useLogotypeStyles = makeStyles(theme => ({
  component: {
    '&&': {
      display: 'grid',
      margin: 0,
      marginRight: 'auto',
    },
    gridTemplateColumns: 'auto auto auto',
    gridTemplateAreas: '"link divider company"',
    gridColumnGap: theme.spacing(2.5),
    alignItems: 'center',
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
  poweredRoot: {
    '&&': {
      opacity: 0.5,
      color: theme.palette.common.white,
    },
  },
  poweredCaption: {
    gridArea: 'company',
    display: 'flex',
    flexDirection: 'column',
    fontSize: 12,
    alignItems: 'flex-start',
    '& svg': {
      marginTop: theme.spacing(0.5),
    },
  },
}));
