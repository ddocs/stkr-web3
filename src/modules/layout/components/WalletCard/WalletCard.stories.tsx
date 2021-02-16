import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import BigNumber from 'bignumber.js';
import React from 'react';
import { Provider } from '../../../../common/types';
import { WalletBalance } from '../WalletBalance';
import { WalletCard } from './WalletCard';
import { IProvider } from "../const";

const useStyles = makeStyles<Theme>(theme => ({
  block: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  content: {
    marginBottom: 16,
  },
}));

const PROVIDERS_1: Record<string, IProvider> = {
  metamask: {
    caption: 'providers.metamask',
    available: true,
  },
  trust: {
    caption: 'providers.trust',
    available: false,
  },
  wallet: {
    caption: 'providers.wallet',
    available: false,
  },
};

const PROVIDERS_3: Record<string, IProvider> = {
  metamask: {
    caption: 'providers.metamask',
    available: false,
  },
  trust: {
    caption: 'providers.trust',
    available: false,
  },
  wallet: {
    caption: 'providers.wallet',
    available: true,
  },
};

const PROVIDERS_2: Record<string, IProvider> = {
  metamask: {
    caption: 'providers.metamask',
    available: true,
  },
  trust: {
    caption: 'providers.trust',
    available: true,
  },
  wallet: {
    caption: 'providers.wallet',
    available: true,
  },
};

const DefaultStory = () => {
  const classes = useStyles();

  return (
    <div className={classes.block}>
      <WalletCard
        className={classes.content}
        visible={true}
        address="0x603366e08380EceB2E334621A27eeD36F34A9D50"
        provider={Provider.metamask}
        providers={PROVIDERS_1}
        balance={
          <WalletBalance
            ethereum={new BigNumber(23)}
            ankr={new BigNumber(10500)}
          />
        }
      />
      <WalletCard
        className={classes.content}
        visible={true}
        address="0x603366e08380EceB2E334621A27eeD36F34A9D50"
        provider={Provider.wallet}
        providers={PROVIDERS_3}
      />
      <WalletCard
        className={classes.content}
        visible={true}
        address="0x603366e08380EceB2E334621A27eeD36F34A9D50"
        provider={Provider.metamask}
        providers={PROVIDERS_2}
      />
      <WalletCard
        className={classes.content}
        visible={true}
        address="0x603366e08380EceB2E334621A27eeD36F34A9D50"
        provider={Provider.wallet}
        providers={PROVIDERS_2}
      />
    </div>
  );
};

export const Default = () => <DefaultStory />;

export default {
  title: 'modules/Layout/components/WalletCard',
};
