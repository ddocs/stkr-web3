import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { UnlockWalletContentComponent } from './UnlockWalletContent';
import { CustomDialog } from '../../../../components/CustomDialog';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const PROVIDERS = {
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
    available: true,
  },
};

const UnlockWalletStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <CustomDialog
        open={true}
        onClose={() => alert('Close')}
        transitionOpacity={true}
      >
        <UnlockWalletContentComponent
          providers={PROVIDERS}
          onConnect={() => alert('Connect')}
        />
      </CustomDialog>
    </div>
  );
};

export const UnlockWalletExample = () => <UnlockWalletStory />;

export default {
  title: 'modules/Layout/components/UnlockWallet',
};
