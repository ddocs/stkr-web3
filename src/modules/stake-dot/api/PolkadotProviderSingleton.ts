import {
  ISlotAuctionConfig,
  PolkadotProvider,
} from '@ankr.com/stakefi-polkadot';

export class PolkadotProviderSingleton {
  // todo: remove vulnerability, now instance can be undefined
  private static _instance: PolkadotProvider;
  public static createInstance(config: ISlotAuctionConfig) {
    if (!PolkadotProviderSingleton._instance) {
      PolkadotProviderSingleton._instance = new PolkadotProvider(config);
    }
  }
  public static getInstance(): PolkadotProvider {
    return PolkadotProviderSingleton._instance;
  }
}
