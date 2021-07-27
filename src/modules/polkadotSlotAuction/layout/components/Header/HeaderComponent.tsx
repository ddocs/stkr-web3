import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { SlotAuctionActions } from '../../../actions/SlotAuctionActions';
import { Curtains } from '../../../../../UiKit/Curtains';
import { Logotype } from '../Logotype';
import { Button } from '../../../../../UiKit/Button';
import { t } from '../../../../../common/utils/intl';
import { useHeaderStyles } from './HeaderStyles';
import { useDispatch } from 'react-redux';
import { useSlotAuctionSdk } from '../../../hooks/useSlotAuctionSdk';
import { QueryLoading } from '../../../../../components/QueryLoading/QueryLoading';
import { WalletSwitcher } from '../WalletSwitcher/WalletSwitcher';

export const HeaderComponent = () => {
  const classes = useHeaderStyles();

  const dispatch = useDispatch();

  const { slotAuctionSdk, polkadotAccount, isConnected } = useSlotAuctionSdk();
  const [loading, setLoading] = useState(false);
  const [polkadotAccounts, setPolkadotAccounts] = useState<string[]>([]);

  const handleGetAccounts = async () => {
    setPolkadotAccounts(await slotAuctionSdk?.getPolkadotAccounts());
  };
  useEffect(() => {
    handleGetAccounts();
  }, []);

  const handleConnect = (newAccount?: string) => async () => {
    setLoading(true);

    await dispatch(SlotAuctionActions.connect(slotAuctionSdk, newAccount));
    await handleGetAccounts();

    setLoading(false);
  };

  return (
    <>
      <header className={classes.component}>
        <Curtains
          classes={{
            root: classNames(classes.inner),
          }}
        >
          <Logotype />
          {isConnected ? (
            <WalletSwitcher
              wallets={polkadotAccounts}
              currentWallet={polkadotAccount}
              onConnect={handleConnect}
            />
          ) : (
            <>
              <Button
                color="primary"
                className={classes.button}
                disabled={loading}
                onClick={handleConnect()}
              >
                {t('polkadot-slot-auction.connect-button')}
              </Button>
              {loading && <QueryLoading />}
            </>
          )}
        </Curtains>
      </header>
    </>
  );
};
