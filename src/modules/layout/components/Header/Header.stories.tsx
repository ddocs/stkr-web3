import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Providers } from '../../../../common/types';
import { AuthorizedHeader } from './AuthorizedHeader';
import { UnauthorizedHeader } from './UnauthorizedHeader';
import BigNumber from 'bignumber.js';

const useStyles = makeStyles<Theme>(() => ({
  block: {},
}));

const HeaderStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <UnauthorizedHeader />
      <AuthorizedHeader
        walletAddress="0x603366e08380EceB2E334621A27eeD36F34A9D50"
        walletType={Providers.metamask}
        ethereumBalance={new BigNumber(23.4536334)}
        ankrBalance={new BigNumber(10500.45)}
      />
    </div>
  );
};

export const HeaderExample = () => <HeaderStory />;

export default {
  title: 'modules/Layout/components/Header',
};
