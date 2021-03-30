/* eslint-disable import/no-anonymous-default-export */
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { CAPTIONS, DATA } from '../mocks';
import { DataTable } from './DataTable';

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
}));

const TableStory = () => {
  const classes = useStyles();

  return (
    <div className={classes.block}>
      <h3 className={classes.title}>Simple Table</h3>
      <DataTable className={classes.table} captions={CAPTIONS} rows={DATA} />
      <hr className={classes.divider} />

      <h3 className={classes.title}>Dense simple table</h3>
      <DataTable
        className={classes.table}
        captions={CAPTIONS}
        rows={DATA}
        dense
      />
      <hr className={classes.divider} />

      <h3 className={classes.title}>Table with fixed sticky header</h3>
      <DataTable captions={CAPTIONS} rows={DATA} stickyHeader />
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
