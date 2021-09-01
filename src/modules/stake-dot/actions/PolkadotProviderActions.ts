import { createAction } from 'redux-smart-actions';
import { PolkadotProvider } from '@ankr.com/stakefi-polkadot';
import { ISlotAuctionConfig } from '@ankr.com/stakefi-polkadot/dist/types/config';

export interface IPolkadotConnected {
  isConnected: boolean;
  networkType: string;
  currentPolkadotAccount: string;
  polkadotAccounts: string[];
}

class PolkadotProviderSingleton {
  private static polkadotProviderInstance: PolkadotProvider;
  public static createInstance(config: ISlotAuctionConfig) {
    if (!PolkadotProviderSingleton.polkadotProviderInstance) {
      PolkadotProviderSingleton.polkadotProviderInstance = new PolkadotProvider(
        config,
      );
    }
  }
  public static getInstance(): PolkadotProvider {
    return PolkadotProviderSingleton.polkadotProviderInstance;
  }
}

export const PolkadotProviderActions = {
  initialize: createAction(
    'INITIALIZE_POLKADOT_PROVIDER',
    (config: ISlotAuctionConfig) => ({
      request: {
        promise: (async function () {
          return PolkadotProviderSingleton.createInstance(config);
        })(),
      },
      meta: {
        asMutation: false,
      },
    }),
  ),
  connect: createAction(
    'CONNECT_POLKADOT_PROVIDER',
    (selectedPolkadotAccount?: string) => ({
      request: {
        promise: (async function (): Promise<IPolkadotConnected> {
          const polkadotProviderInstance = PolkadotProviderSingleton.getInstance();

          const isConnected = polkadotProviderInstance.isConnected();

          if (!isConnected) {
            await polkadotProviderInstance.connect();
          }

          const polkadotAccounts = await polkadotProviderInstance.getAccounts();
          const selectedAccountIndex = polkadotAccounts.indexOf(
            selectedPolkadotAccount ?? '',
          );
          const currentPolkadotAccount =
            polkadotAccounts[
              selectedAccountIndex === -1 ? 0 : selectedAccountIndex
            ];

          const networkType = await polkadotProviderInstance.getNetworkType();

          return {
            isConnected,
            networkType,
            currentPolkadotAccount,
            polkadotAccounts,
          };
        })(),
      },
      meta: {
        asMutation: false,
      },
    }),
  ),
};
