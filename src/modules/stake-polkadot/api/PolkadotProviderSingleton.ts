import {
  ISlotAuctionConfig,
  PolkadotProvider,
} from '@ankr.com/stakefi-polkadot';

export class PolkadotProviderSingleton {
  private static _config: ISlotAuctionConfig;
  private static _instance: PolkadotProvider;

  public static createInstance(config: ISlotAuctionConfig) {
    if (!this._instance || this._config !== config) {
      this._instance = new PolkadotProvider(config);
    }
  }

  public static getInstance(): PolkadotProvider {
    return this._instance;
  }
}
