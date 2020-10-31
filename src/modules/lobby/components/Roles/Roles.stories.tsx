import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Roles } from './Roles';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const RolesStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Roles />
    </div>
  );
};

export const RolesExample = () => <RolesStory />;

export default {
  title: 'modules/Lobby/component/Roles',
};
