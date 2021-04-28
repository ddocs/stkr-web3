import { Blockchain } from '../../common/types';
import { t } from '../../common/utils/intl';

export enum BlockchainIcons {
  aEth = 'aEth',
  fEth = 'fEth',
  eth = 'eth',
  binance = 'binance',
}

export const blockchainsMap: Record<
  Blockchain,
  {
    title: string;
    icon: BlockchainIcons;
  }
> = {
  [Blockchain.ethereum]: {
    title: t('cross-chain-bridge.chain-ehthereum'),
    icon: BlockchainIcons.eth,
  },
  [Blockchain.binance]: {
    title: t('cross-chain-bridge.chain-binance'),
    icon: BlockchainIcons.binance,
  },
};
