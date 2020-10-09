import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { DataTable } from './DataTable';
import { CAPTIONS, DATA } from '../mocks';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},

  title: {
    marginTop: 0,
  },

  divider: {
    marginTop: 32,
    marginBottom: 16,

    backgroundColor: theme.palette.grey[100],
  },

  limitHeight: {
    height: '200px',
  },
}));

const TableStory = () => {
  const classes = useStyles();

  return (
    <div className={classes.block}>
      <h3 className={classes.title}>Simple Table</h3>
      <DataTable className={classes.table} captions={CAPTIONS} rows={DATA} />
      <hr className={classes.divider} />

      <h3 className={classes.title}>Defense simple table</h3>
      <DataTable
        className={classes.table}
        captions={CAPTIONS}
        rows={DATA}
        defense={true}
      />
      <hr className={classes.divider} />

      <h3 className={classes.title}>Table with fixed sticky header</h3>
      <DataTable className={classes.limitHeight} captions={CAPTIONS} rows={DATA} />
      <p>Just add limit height for Simple Table</p>
      <hr className={classes.divider} />

      <h3 className={classes.title}>Table with custom cell's size</h3>
      <DataTable
        className={classes.table}
        captions={CAPTIONS}
        rows={DATA}
        customCell="2.5fr 1.5fr 1fr 1.5fr minmax(70px, 1fr)"
      />
    </div>
  );
};

export const TableExample = () => <TableStory />;

export default {
  title: 'components/DataTableCustom',
};
