import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme } from '@material-ui/core';

export const useRangeFieldStyles = makeStyles((theme: Theme) =>
  createStyles({
    component: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gridRowGap: theme.spacing(1.5),
    },

    label: {
      display: 'inline-flex',
      justifyContent: 'space-between',

      color: theme.palette.text.primary,

      transform: 'scale(0.65)',

      transformOrigin: 'left center',
    },

    value: {
      fontSize: 18,
      lineHeight: 1.2,

      transform: 'scale(1)',
    },

    range: {
      gridColumn: '-1/1',
    },
  }),
);
