import { useDispatchRequest, useQuery } from '@redux-requests/react';
import React, { useCallback } from 'react';
import { ErrorMessage } from '.';
import { t } from '../../../../common/utils/intl';
import { connect, IPolkadotConnected } from '../../actions/connect';
import { getAccountBalance } from '../../actions/getAccountBalance';
import { getDepositAddress } from '../../actions/getDepositAddress';

export const ConnectErrorMessage = () => {
  const dispatchRequest = useDispatchRequest();

  const { error: getDepositAddrError } = useQuery({
    type: getDepositAddress,
  });

  const { error: getAccBalanceError } = useQuery({
    type: getAccountBalance,
  });

  const { data: connectData } = useQuery<IPolkadotConnected | null>({
    type: connect,
  });

  const repeatFailedRequests = useCallback(() => {
    if (!connectData) {
      return;
    }
    if (getDepositAddrError) {
      dispatchRequest(getDepositAddress(connectData.networkType));
    }
    if (getAccBalanceError) {
      dispatchRequest(getAccountBalance(connectData.currentPolkadotAccount));
    }
  }, [connectData, dispatchRequest, getAccBalanceError, getDepositAddrError]);

  return getDepositAddrError || getAccBalanceError ? (
    <>
      <ErrorMessage title={t('error.some')} onClick={repeatFailedRequests} />
    </>
  ) : null;
};
