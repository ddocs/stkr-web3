import { Query, useDispatchRequest } from '@redux-requests/react';
import React, { useCallback } from 'react';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { connect, IPolkadotConnected } from '../../actions/connect';
import { PolkadotAccountSwitcherComponent } from './PolkadotAccountSwitcherComponent';
import { PolkadotAccountSwitcherSkeleton } from './PolkadotAccountSwitcherSkeleton';

export const PolkadotAccountSwitcher = () => {
  const dispatchRequest = useDispatchRequest();

  const handleConnect = useCallback(
    (newAccount: string) => {
      dispatchRequest(connect(newAccount));
    },
    [dispatchRequest],
  );

  return (
    <Query<IPolkadotConnected>
      type={connect}
      errorComponent={QueryError}
      loadingComponent={PolkadotAccountSwitcherSkeleton}
    >
      {({ data }) => (
        <PolkadotAccountSwitcherComponent
          wallets={data.polkadotAccounts}
          currentWallet={data.currentPolkadotAccount}
          onChange={handleConnect}
        />
      )}
    </Query>
  );
};
