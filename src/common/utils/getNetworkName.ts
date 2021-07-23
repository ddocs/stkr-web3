import { t } from './intl';
import { BlockchainNetworkId } from '../types';

export function getNetworkName(chainId: BlockchainNetworkId) {
  return t(`chain.${chainId}`);
}
