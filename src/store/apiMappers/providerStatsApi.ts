import BigNumber from 'bignumber.js';

export interface IApiProviderStats {
  providerEthBalance: BigNumber;
}

export interface IProviderStats {
  balance: BigNumber;
}

export function mapProviderStats(data: IApiProviderStats): IProviderStats {
  return {
    balance: data.providerEthBalance,
  };
}
