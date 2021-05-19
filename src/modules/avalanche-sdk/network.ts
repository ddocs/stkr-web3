export interface INetworkEntity {
  name: string;
  chainId: string;
  type: 'mainnet' | 'testnet';
}

export const AVAILABLE_NETWORKS: Record<string, INetworkEntity> = {
  '1': {
    name: 'Ethereum Mainnet',
    chainId: '1',
    type: 'mainnet',
  },
  '56': {
    name: 'Binance Smart Chain',
    chainId: '56',
    type: 'mainnet',
  },
  '43114': {
    name: 'Avalanche Mainnet',
    chainId: '43114',
    type: 'mainnet',
  },
  '5': {
    name: 'Ethereum Goerli',
    chainId: '5',
    type: 'testnet',
  },
  '97': {
    name: 'Binance Smart Chain Testnet',
    chainId: '97',
    type: 'testnet',
  },
  '43113': {
    name: 'Avalanche Testnet',
    chainId: '43113',
    type: 'testnet',
  },
};
