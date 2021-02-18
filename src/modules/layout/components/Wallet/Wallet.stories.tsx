import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import BigNumber from 'bignumber.js';
import React from 'react';
import { Provider } from '../../../../common/types';
import { WalletBalance } from '../WalletBalance';
import { WalletCard } from '../WalletCard';
import { Wallet } from './Wallet';

const useStyles = makeStyles<Theme>(() => ({
  block: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

const WalletStory = () => {
  const classes = useStyles();
  const address = '0x603366e08380EceB2E334621A27eeD36F34A9D50';
  const provider = Provider.metamask;

  return (
    <div className={classes.block}>
      <Wallet
        address={address}
        provider={provider}
        balance={
          <WalletBalance
            ethereum={new BigNumber(23)}
            ankr={new BigNumber(10500)}
          />
        }
      >
        <WalletCard address={address} provider={provider} />
      </Wallet>
    </div>
  );
};

export const WalletExample = () => <WalletStory />;

export default {
  title: 'modules/Layout/components/Wallet',
};
