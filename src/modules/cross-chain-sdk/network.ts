export interface INetworkEntity {
  name: string;
  chainId: string;
  type: 'mainnet' | 'testnet';
  tag: string;
}

export const AVAILABLE_NETWORKS: Record<string, INetworkEntity> = {
  '1': {
    name: 'Ethereum Mainnet',
    chainId: '1',
    type: 'mainnet',
    tag: 'ETH',
  },
  '56': {
    name: 'Binance Smart Chain',
    chainId: '56',
    type: 'mainnet',
    tag: 'BSC',
  },
  '43114': {
    name: 'Avalanche Mainnet',
    chainId: '43114',
    type: 'mainnet',
    tag: 'AVA',
  },
  '5': {
    name: 'Ethereum Goerli',
    chainId: '5',
    type: 'testnet',
    tag: 'ETH',
  },
  '97': {
    name: 'Binance Smart Chain Testnet',
    chainId: '97',
    type: 'testnet',
    tag: 'BSC',
  },
  '43113': {
    name: 'Avalanche Testnet',
    chainId: '43113',
    type: 'testnet',
    tag: 'AVA',
  },
};
