import { Chain } from '../const';
import { t } from './intl';

export function getNetworkName(chainId: Chain) {
  return t(`chain.${chainId}`);
}
