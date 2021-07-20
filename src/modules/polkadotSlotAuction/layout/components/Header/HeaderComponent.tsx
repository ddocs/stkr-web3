import React, { useState } from 'react';
import classNames from 'classnames';
import { SlotAuctionActions } from '../../../actions/SlotAuctionActions';
import { walletConversion } from '../../../../../common/utils/convertWallet';
import { Curtains } from '../../../../../UiKit/Curtains';
import { Logotype } from '../Logotype';
import { Button } from '../../../../../UiKit/Button';
import { t } from '../../../../../common/utils/intl';
import { useHeaderStyles } from './HeaderStyles';
import { useDispatch } from 'react-redux';
import { useSlotAuctionSdk } from '../../../hooks/useSlotAuctionSdk';
import { QueryLoading } from '../../../../../components/QueryLoading/QueryLoading';

interface IHeaderFrameProps {}

export const HeaderComponent = ({}: IHeaderFrameProps) => {
  const classes = useHeaderStyles();

  const dispatch = useDispatch();

  const {
    slotAuctionSdk,
    isConnected,
    polkadotAccount: polkadotAccountSdk,
  } = useSlotAuctionSdk();

  const [loading, setLoading] = useState(false);
  const [polkadotAccount, setPolkadotAccount] = useState(
    walletConversion(polkadotAccountSdk),
  );

  const handleConnect = async () => {
    setLoading(true);

    await dispatch(SlotAuctionActions.connect(slotAuctionSdk));

    const polkadotAccounts = await slotAuctionSdk?.getPolkadotAccounts();
    setPolkadotAccount(walletConversion(polkadotAccounts[0]));

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
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
            >
              {polkadotAccount}
            </Button>
          ) : (
            <>
              <Button
                color="primary"
                className={classes.button}
                disabled={loading}
                onClick={handleConnect}
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
