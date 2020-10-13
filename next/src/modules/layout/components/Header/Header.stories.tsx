import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { UserActions } from '../../../../store/actions/UserActions';
import { Providers } from '../../../../common/types';
import { AuthorizedHeader } from './AuthorizedHeader';
import { UnauthorizedHeader } from './UnauthorizedHeader';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const HeaderStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <UnauthorizedHeader />
      <AuthorizedHeader
        fetchUserInfo={UserActions.fetchUserInfo}
        walletAddress="0x603366e08380EceB2E334621A27eeD36F34A9D50"
        walletType={Providers.metamask}
        ethereumBalance={23}
        ankrBalance={10500}
      />
    </div>
  );
};

export const HeaderExample = () => <HeaderStory />;

export default {
  title: 'modules/Layout/components/Header',
};
