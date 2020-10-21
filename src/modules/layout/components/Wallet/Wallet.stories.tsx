import React from 'react';

import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Wallet } from './Wallet';
import { Providers } from '../../../../common/types';

const useStyles = makeStyles<Theme>(theme => ({
  block: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

const WalletStory = () => {
  const classes = useStyles();

  return (
    <div className={classes.block}>
      <Wallet
        address="0x603366e08380EceB2E334621A27eeD36F34A9D50"
        provider={Providers.metamask}
        ethereumBalance={'23'}
        ankrBalance={'10500'}
      />
    </div>
  );
};

export const WalletExample = () => <WalletStory />;

export default {
  title: 'modules/Layout/components/Wallet',
};
