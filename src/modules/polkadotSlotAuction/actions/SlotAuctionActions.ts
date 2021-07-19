import { createAction } from 'redux-smart-actions';
import { SlotAuctionSdk, TCrowdloanStatus } from '@ankr.com/stakefi-polkadot';
import { Web3KeyProvider } from '@ankr.com/stakefi-web3';
import BigNumber from 'bignumber.js';

export const SlotAuctionActions = {
  initialize: createAction('INITIALIZE_SLOT_AUCTION_SDK', () => ({
    request: {
      promise: (async function () {
        const web3KeyProvider = new Web3KeyProvider({
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
    (slotAuctionSdk: SlotAuctionSdk) => ({
      request: {
        promise: (async function () {
          await slotAuctionSdk.connect();
          const [polkadotAccount] = await slotAuctionSdk.getPolkadotAccounts();
          const isConnected = slotAuctionSdk.isConnected();
          return {
            polkadotAccount,
            isConnected,
          };
        })(),
      },
      meta: {
        asMutation: false,
      },
    }),
  ),
  fetchCrowdloans: createAction(
    'FETCH_CROWDLOANS_BY_TYPE',
    (slotAuctionSdk: SlotAuctionSdk, status: TCrowdloanStatus) => ({
      request: {
        promise: (async () => {
          return slotAuctionSdk.getCrowdloansByStatus(status);
        })(),
      },
      meta: {
        asMutation: false,
      },
    }),
  ),
  fetchCrowdloanBalances: createAction(
    'FETCH_CROWDLOAN_BALANCES',
    (slotAuctionSdk: SlotAuctionSdk, polkadotAccount: string) => ({
      request: {
        promise: (async () => {
          const backendBalances = await slotAuctionSdk.getCrowdloanBalances(
            polkadotAccount,
          );
          let result: Record<
            number,
            {
              total: BigNumber;
              claimable: BigNumber;
              onchain: BigNumber;
              claimableStakingRewards: BigNumber;
            }
          > = backendBalances.reduce((result, item) => {
            return {
              ...result,
              [item.loanId]: {
                total: new BigNumber('0'),
                claimable: new BigNumber('0'),
                onchain: new BigNumber('0'),
                claimableStakingRewards: new BigNumber('0'),
              },
            };
          }, {});
          const ethereumAccount = await slotAuctionSdk.getEthereumAccount();
          const chainBalances = await slotAuctionSdk.getRewardPoolBalances(
            ethereumAccount,
          );
          result = chainBalances.reduce((result, item) => {
            if (result[item.loanId]) {
              result[item.loanId].onchain = item.balance;
            }
            return result;
          }, result);
          const claimableStakingRewards = await slotAuctionSdk.getClaimableStakingRewards();
          result = claimableStakingRewards.reduce((result, item) => {
            if (result[item.loanId]) {
              result[item.loanId].claimableStakingRewards = item.amount;
            }
            return result;
          }, result);
          console.log(`Current balances: ${JSON.stringify(result, null, 2)}`);
          return result;
        })(),
      },
      meta: {
        asMutation: false,
      },
    }),
  ),
};
