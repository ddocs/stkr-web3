import React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Box } from '@material-ui/core';
import { web3Enable } from '@polkadot/extension-dapp';
import { PolkadotProvider } from '@ankr.com/stakefi-polkadot';
import { SlotAuctionActions } from '../../../actions/SlotAuctionActions';
import { Curtains } from '../../../../../UiKit/Curtains';
import { Logotype } from '../Logotype';
import { Button } from '../../../../../UiKit/Button';
import { t } from '../../../../../common/utils/intl';
import { useSlotAuctionSdk } from '../../../hooks/useSlotAuctionSdk';
import { QueryLoading } from '../../../../../components/QueryLoading/QueryLoading';
import { WalletSwitcher } from '../WalletSwitcher/WalletSwitcher';
import { usePolkadotAccounts } from '../../../hooks/usePolkadotAccounts';
import { NetworkSwitcher } from '../NetworkSwitcher/NetworkSwitcher';
import { useHeaderStyles } from './HeaderStyles';
import { PolkadotExtension } from '../../../components/PolkadotExtension/PolkadotExtension';
import { useDialog } from '../../../../../store/dialogs/selectors';
import { DIALOG_POLKADOT_EXTENSION } from '../../../../../store/dialogs/actions';
import { useQuery } from '@redux-requests/react';

export const HeaderComponent = () => {
  const classes = useHeaderStyles();

  const dispatch = useDispatch();

  const { slotAuctionSdk, polkadotAccount, isConnected } = useSlotAuctionSdk();
  const { polkadotAccounts } = usePolkadotAccounts(slotAuctionSdk);

  const { isOpened, handleClose, handleOpen } = useDialog(
    DIALOG_POLKADOT_EXTENSION,
  );

  const { loading: connectLoading } = useQuery({
    type: SlotAuctionActions.connect.toString(),
    action: SlotAuctionActions.connect,
  });

  const { loading: connectLoadingFetchPolkadotAccountsLoading } = useQuery({
    type: SlotAuctionActions.fetchPolkadotAccounts.toString(),
    action: SlotAuctionActions.fetchPolkadotAccounts,
  });

  const loading = connectLoading || connectLoadingFetchPolkadotAccountsLoading;

  const handleConnect = (newAccount?: string) => async () => {
    await web3Enable('stakefi.com');

    if (!PolkadotProvider.isSupported()) {
      handleOpen();
      return;
    }

    await dispatch(SlotAuctionActions.connect(slotAuctionSdk, newAccount));
    await dispatch(SlotAuctionActions.fetchPolkadotAccounts(slotAuctionSdk));
  };

  return (
    <>
      <header className={classes.component}>
        <Curtains
          classes={{
            root: classNames(classes.inner),
          }}
        >
          <div className={classes.leftContent}>
            <Logotype />
            <NetworkSwitcher />
          </div>
          {isConnected ? (
            <WalletSwitcher
              wallets={polkadotAccounts}
              currentWallet={polkadotAccount}
              onConnect={handleConnect}
            />
          ) : (
            <Box display="flex">
              <Button
                color="primary"
                className={classes.button}
                disabled={loading}
                onClick={handleConnect()}
              >
                {t('polkadot-slot-auction.connect-button')}
              </Button>
              {loading && <QueryLoading size={40} />}
            </Box>
          )}
        </Curtains>
      </header>

      <PolkadotExtension isOpened={isOpened} onClose={handleClose} />
    </>
  );
};
