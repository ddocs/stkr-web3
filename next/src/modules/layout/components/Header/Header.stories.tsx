import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { HeaderComponent } from './Header';
import { UserActions } from '../../../../store/actions/UserActions';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const HeaderStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <HeaderComponent fetchUserInfo={UserActions.fetchUserInfo} />
      <HeaderComponent
        isAuth={true}
        fetchUserInfo={UserActions.fetchUserInfo}
      />
    </div>
  );
};

export const HeaderExample = () => <HeaderStory />;

export default {
  title: 'modules/Layout/components/Header',
};
