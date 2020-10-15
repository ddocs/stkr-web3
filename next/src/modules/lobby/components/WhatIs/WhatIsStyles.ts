import { makeStyles } from '@material-ui/core/styles';

export const useWhatIsStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4.5),
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '400px 1fr',
    columnGap: theme.spacing(8),
    padding: theme.spacing(7.5, 4.5),
    width: '100%',

    '& .WhatIs__title_yellow': {
      color: theme.palette.primary.main,
    },
  },
  note: {
    marginBottom: theme.spacing(5),
  },
}));
