import BigNumber from 'bignumber.js';

export interface IApiProviderStats {
  providerEthBalance: BigNumber;
  providerAnkrBalance: BigNumber;
  depositedAnkrBalance: BigNumber;
}

export interface IProviderStats {
  ethBalance: BigNumber;
  ankrBalance: BigNumber;
  depositedAnkrBalance: BigNumber;
}

export function mapProviderStats(data: IApiProviderStats): IProviderStats {
  return {
    ethBalance: data.providerEthBalance,
    ankrBalance: data.providerAnkrBalance,
    depositedAnkrBalance: data.depositedAnkrBalance,
  };
}
