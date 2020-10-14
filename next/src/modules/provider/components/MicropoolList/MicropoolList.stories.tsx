import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { MicropoolListComponent } from './MicropoolList';
import { MICRO_POOL_DATA } from '../../mock';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},

  content: {
    marginBottom: 16,
  },
}));

const MicropoolListStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <MicropoolListComponent
        className={classes.content}
        data={MICRO_POOL_DATA}
      />
      <MicropoolListComponent className={classes.content} data={undefined} />
    </div>
  );
};

export const MicropoolListExample = () => <MicropoolListStory />;

export default {
  title: 'modules/provider/component/MicropoolList',
};
