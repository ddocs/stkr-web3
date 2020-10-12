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
    },

    value: {
      fontSize: 18,
      lineHeight: 1.2,
    },

    range: {
      gridColumn: '-1/1',
    },
  }),
);
