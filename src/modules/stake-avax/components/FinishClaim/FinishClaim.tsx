import { useMutation, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { BlockchainNetworkId } from '../../../../common/types';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { AvalancheActions } from '../../actions/AvalancheActions';
import { selectUserChainId } from '../../../../store/reducers/userReducer';
import { IWalletStatus, StakingStep } from '../../api/types';
import { useQueryParams } from '../../hooks/useQueryParams';
import { FinishClaimComponent } from './FinishClaimComponent';

export const FinishClaim = () => {
  const dispatchRequest = useRequestDispatch();
  const queryParams = useQueryParams();
  const amountQueryParam = queryParams.get('depositAmount');
  const amount = amountQueryParam ? new BigNumber(amountQueryParam) : undefined;
  const chainId = useSelector(selectUserChainId);

  const { data: transactionStatus } = useQuery<IWalletStatus | null>({
    type: AvalancheActions.fetchTransactionStatus.toString(),
  });

  const { loading: withdrawFromAvaLoading } = useMutation({
    type: AvalancheActions.withdrawFromAvalancheBridge.toString(),
  });

  const { loading: withdrawLoading } = useMutation({
    type: AvalancheActions.withdrawFromBridge.toString(),
  });

  const onWithdraw = useCallback(() => {
    if (transactionStatus?.step !== StakingStep.WithdrawalAAvaxB) {
      return;
    }

    const isAvalancheChain =
      chainId === BlockchainNetworkId.avalanche ||
      chainId === BlockchainNetworkId.avalancheTestnet;

    if (isAvalancheChain) {
      dispatchRequest(
        AvalancheActions.withdrawFromBridge(transactionStatus),
      ).then(({ error }) => {
        if (error) {
          dispatchRequest(AvalancheActions.fetchTransactionStatus());
        } else {
          dispatchRequest(AvalancheActions.fetchStakerStats());
        }
      });
    } else {
      dispatchRequest(
        AvalancheActions.withdrawFromAvalancheBridge(transactionStatus),
      ).then(({ error }) => {
        if (error) {
          dispatchRequest(AvalancheActions.fetchTransactionStatus());
        } else {
          dispatchRequest(AvalancheActions.fetchClaimStats());
        }
      });
    }
  }, [chainId, dispatchRequest, transactionStatus]);

  return (
    <>
      <MutationErrorHandler
        type={AvalancheActions.withdrawFromAvalancheBridge.toString()}
      />

      <MutationErrorHandler
        type={AvalancheActions.withdrawFromBridge.toString()}
      />

      <FinishClaimComponent
        amount={amount}
        onClick={onWithdraw}
        isLoading={withdrawFromAvaLoading || withdrawLoading}
      />
    </>
  );
};
