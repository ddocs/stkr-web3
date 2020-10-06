import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { ProviderComponent } from './Provider';
import { DefaultLayoutComponent } from '../layout/components/DefautLayout/DefautLayout';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const ProviderStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <DefaultLayoutComponent signIn={() => null as any} isAuth={true}>
        <ProviderComponent isProvider={false} />
      </DefaultLayoutComponent>
    </div>
  );
};

export const ProviderExample = () => <ProviderStory />;

export default {
  title: 'modules/Provider',
};
