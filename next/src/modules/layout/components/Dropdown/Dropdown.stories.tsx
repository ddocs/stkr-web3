import React from 'react';

import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { DropdownComponent } from './Dropdown';
import { Providers } from '../../../../common/types';

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

const PROVIDERS_1: Record<string, any> = {
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

const PROVIDERS_3: Record<string, any> = {
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

const PROVIDERS_2: Record<string, any> = {
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

const DropdownStory = () => {
  const classes = useStyles();

  return (
    <div className={classes.block}>
      <DropdownComponent
        className={classes.content}
        visible={true}
        address="0x603366e08380EceB2E334621A27eeD36F34A9D50"
        provider={Providers.metamask}
        providers={PROVIDERS_1}
      />
      <DropdownComponent
        className={classes.content}
        visible={true}
        address="0x603366e08380EceB2E334621A27eeD36F34A9D50"
        provider={Providers.wallet}
        providers={PROVIDERS_3}
      />
      <DropdownComponent
        className={classes.content}
        visible={true}
        address="0x603366e08380EceB2E334621A27eeD36F34A9D50"
        provider={Providers.metamask}
        providers={PROVIDERS_2}
      />
      <DropdownComponent
        className={classes.content}
        visible={true}
        address="0x603366e08380EceB2E334621A27eeD36F34A9D50"
        provider={Providers.wallet}
        providers={PROVIDERS_2}
      />
    </div>
  );
};

export const DropdownExample = () => <DropdownStory />;

export default {
  title: 'modules/Layout/components/Dropdown',
};
