import { useQuery } from '@redux-requests/react';
import { BlockchainNetworkId } from '../../../common/types';
import { AvalancheActions } from '../../../store/actions/AvalancheActions';
import { IWalletStatus } from '../../avalanche-sdk/types';
import { isWalletStake } from '../../avalanche-sdk/utils';

export const useWalletStatus = () => {
  const { data: walletStatus } = useQuery<IWalletStatus | null>({
    type: AvalancheActions.checkWallet.toString(),
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
