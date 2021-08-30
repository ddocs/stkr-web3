import { useQuery } from '@redux-requests/react';
import { BlockchainNetworkId } from '../../../common/types';
import { AvalancheActions } from '../actions/AvalancheActions';
import { IWalletStatus } from '../api/types';
import { isWalletStake } from '../api/utils';

export const useWalletStatus = () => {
  const { data: walletStatus } = useQuery<IWalletStatus | null>({
    type: AvalancheActions.fetchTransactionStatus.toString(),
  });

  const requiredNetwork =
    walletStatus && isWalletStake(walletStatus)
      ? walletStatus.requiredNetwork
      : undefined;

  const isAvalancheChain =
    requiredNetwork === BlockchainNetworkId.avalanche ||
    requiredNetwork === BlockchainNetworkId.avalancheTestnet;

  return {
    requiredNetwork,
    isAvalancheChain,
  };
};
