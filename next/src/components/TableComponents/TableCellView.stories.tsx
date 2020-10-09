import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { DataTable } from './DataTable';
import { CAPTIONS, CAPTIONS_2, DATA } from './mocks';

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
    maxHeight: '200px',
  },
}));

const TableStory = () => {
  const classes = useStyles();

  return (
    <div className={classes.block}>
      <h3 className={classes.title}>
        Table with cell, which content display on left side
      </h3>
      <DataTable className={classes.table} captions={CAPTIONS} rows={DATA} />
      <hr className={classes.divider} />

      <h3 className={classes.title}>
        Table with cell, which content display on right side
      </h3>
      <DataTable
        className={classes.table}
        captions={CAPTIONS}
        rows={DATA}
        alignCell="right"
      />
      <hr className={classes.divider} />

      <h3 className={classes.title}>
        Table with cell, which content display on center
      </h3>
      <DataTable
        className={classes.table}
        captions={CAPTIONS}
        rows={DATA}
        alignCell="center"
      />
      <hr className={classes.divider} />

      <h3 className={classes.title}>
        Table with cell, which content display on different side
      </h3>
      <DataTable className={classes.table} captions={CAPTIONS_2} rows={DATA} />
      <hr className={classes.divider} />
    </div>
  );
};

export const TableCellViewExample = () => <TableStory />;

export default {
  title: 'components/Table',
};
