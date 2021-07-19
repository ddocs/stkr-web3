import { createAction } from 'redux-smart-actions';
import { SlotAuctionSdk } from '@ankr.com/stakefi-polkadot';
import { Web3KeyProvider } from '@ankr.com/stakefi-web3';

export const SlotAuctionActions = {
  initialize: createAction('INITIALIZE_SLOT_AUCTION_SDK', () => ({
    request: {
      promise: (async function () {
        const web3KeyProvider = new Web3KeyProvider({
          // TODO: "replace me with config"
          expectedChainId: 5,
        });
        // TODO: "by default it uses develop config, replace with envs"
        return new SlotAuctionSdk(web3KeyProvider);
      })(),
    },
    meta: {
      asMutation: false,
    },
  })),
  connect: createAction(
    'CONNECT_SLOT_AUCTION_SDK',
    (SlotAuctionSdk: SlotAuctionSdk) => ({
      request: {
        promise: (async function () {
          await SlotAuctionSdk.connect();

          return SlotAuctionSdk.isConnected();
        })(),
      },
      meta: {
        asMutation: false,
      },
    }),
  ),
};
