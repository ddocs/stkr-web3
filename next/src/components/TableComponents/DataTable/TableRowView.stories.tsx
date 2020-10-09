import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { DataTable } from './DataTable';
import { CAPTIONS, DATA_4 } from '../mocks';

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
      <h3 className={classes.title}>Table with link instead row</h3>
      <DataTable className={classes.table} captions={CAPTIONS} rows={DATA_4} />
      <hr className={classes.divider} />
    </div>
  );
};

export const TableRowViewExample = () => <TableStory />;

export default {
  title: 'components/Table',
};
