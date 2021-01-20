import { makeStyles } from '@material-ui/core/styles';

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
