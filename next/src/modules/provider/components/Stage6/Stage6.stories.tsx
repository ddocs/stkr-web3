import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Stage6Component } from './Stage6';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const Stage6Story = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Stage6Component
        nextStep={() => alert('to next stage')}
        prevStep={() => alert('to prev stage')}
        balance={100}
        amount={100000}
        price={32}
        beacon={[{ value: '1', label: 'Alex_Beacon_Node' }]}
      />
    </div>
  );
};

export const Stage6Example = () => <Stage6Story />;

export default {
  title: 'modules/provider/component/Stage6',
};
