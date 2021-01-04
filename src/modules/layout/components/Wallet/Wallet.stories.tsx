import React from 'react';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Wallet } from './Wallet';
import { Providers } from '../../../../common/types';
import BigNumber from 'bignumber.js';

const useStyles = makeStyles<Theme>(() => ({
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
        ethereumBalance={new BigNumber(23)}
        ankrBalance={new BigNumber(10500)}
      />
    </div>
  );
};

export const WalletExample = () => <WalletStory />;

export default {
  title: 'modules/Layout/components/Wallet',
};
