import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core';

export const useNodeListStyles = makeStyles<Theme>(theme => ({
  table: {
    width: '100%',
  },
  icon: {
    padding: 0,
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    '&.Mui-disabled': {
      opacity: 0.5,
    },
  },
  noticeWrapper: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  },
  icons: {
    '&&': {
      whiteSpace: 'normal',
    },
  },
}));
