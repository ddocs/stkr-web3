import { t } from './intl';
import { BlockchainNetworkId } from '@ankr.com/stkr-jssdk';

export function getNetworkName(chainId: BlockchainNetworkId) {
  return t(`chain.${chainId}`);
}
