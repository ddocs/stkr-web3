import { createAction } from 'redux-smart-actions';
import { SlotAuctionSdk, TCrowdloanStatus } from '@ankr.com/stakefi-polkadot';
import { Web3KeyProvider } from '@ankr.com/stakefi-web3';
import BigNumber from 'bignumber.js';
import { ContractManager } from '@ankr.com/stakefi-polkadot';

class SlotAuctionSdkSingleton {
  private static sdk?: SlotAuctionSdk;
  public static getInstance(): SlotAuctionSdk {
    if (SlotAuctionSdkSingleton.sdk) return SlotAuctionSdkSingleton.sdk;
    const web3KeyProvider = new Web3KeyProvider({
      expectedChainId: 5,
    });
    // TODO: "by default it uses develop config, replace with envs"
    SlotAuctionSdkSingleton.sdk = new SlotAuctionSdk(web3KeyProvider);
    return SlotAuctionSdkSingleton.sdk;
  }
}

export const SlotAuctionActions = {
  initialize: createAction('INITIALIZE_SLOT_AUCTION_SDK', () => ({
    request: {
      promise: (async function () {
        return SlotAuctionSdkSingleton.getInstance();
      })(),
    },
    meta: {
      asMutation: false,
    },
  })),
  connect: createAction(
    'CONNECT_SLOT_AUCTION_SDK',
    (slotAuctionSdk: SlotAuctionSdk, selectedPolkadotAccount?: string) => ({
      request: {
        promise: (async function () {
          if (!slotAuctionSdk.isConnected()) {
            await slotAuctionSdk.connect();
          }
          const accounts = await slotAuctionSdk.getPolkadotAccounts();
          const selectedAccountIndex = accounts.indexOf(
            selectedPolkadotAccount ?? '',
          );
          const polkadotAccount =
            accounts[selectedAccountIndex === -1 ? 0 : selectedAccountIndex];
          const isConnected = slotAuctionSdk.isConnected();
          const networkType = await slotAuctionSdk
            .getPolkadotProvider()
            .getNetworkType();
          return {
            polkadotAccount,
            networkType,
            isConnected,
          };
        })(),
      },
      meta: {
        asMutation: false,
      },
    }),
  ),
  fetchPolkadotBalance: createAction(
    'FETCH_POLKADOT_BALANCE',
    (slotAuctionSdk: SlotAuctionSdk, polkadotAccount: string) => ({
      request: {
        promise: (async () => {
          const balance = await slotAuctionSdk.getPolkadotBalance(
              polkadotAccount,
            ),
            networkType = await slotAuctionSdk
              .getPolkadotProvider()
              .getNetworkType();
          return {
            balance,
            symbol: networkType,
          };
        })(),
      },
      meta: {
        asMutation: false,
      },
    }),
  ),
  fetchCrowdloansByStatus: createAction(
    'FETCH_CROWDLOANS_BY_STATUS',
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
  fetchCrowdloanById: createAction(
    'FETCH_CROWDLOAN_BY_ID',
    (slotAuctionSdk: SlotAuctionSdk, loanId: number) => ({
      request: {
        promise: (async () => {
          const crowdloan = await slotAuctionSdk.getCrowdloanById(loanId);
          return {
            crowdloan,
            isLoading: false,
          };
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
              rewardPoolSymbol: string;
              stakingTokenSymbol: string;
            }
          > = backendBalances.reduce((result, item) => {
            return {
              ...result,
              [item.loanId]: {
                total: new BigNumber(item.total),
                claimable: new BigNumber(item.claimable),
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

          const crowdloanTokenName: Record<
            number,
            {
              rewardPoolSymbol: string;
              stakingTokenSymbol: string;
            }
          > = {};
          for (const key of Object.keys(result)) {
            if (crowdloanTokenName[Number(key)]) {
              continue;
            }
            const crowdloan = await slotAuctionSdk.getCrowdloanById(
              Number(key),
            );
            const contractManager = new ContractManager(
              slotAuctionSdk.getKeyProvider(),
              {
                rewardPoolAddress: crowdloan.bondTokenContract,
              },
            );
            let rewardPoolSymbol = 'aDOTp';
            try {
              rewardPoolSymbol = await contractManager.getRewardPoolSymbol();
            } catch (e) {
              console.error(e);
            }
            let stakingTokenSymbol = 'ABC';
            try {
              stakingTokenSymbol = await contractManager.getStakingTokenSymbol();
            } catch (e) {
              console.error(e);
            }
            crowdloanTokenName[Number(key)] = {
              rewardPoolSymbol,
              stakingTokenSymbol,
            };
          }
          for (const [key, value] of Object.entries(result)) {
            if (!crowdloanTokenName[Number(key)]) {
              continue;
            }
            value.rewardPoolSymbol =
              crowdloanTokenName[Number(key)].rewardPoolSymbol;
            value.stakingTokenSymbol =
              crowdloanTokenName[Number(key)].stakingTokenSymbol;
            result[Number(key)] = value;
          }
          console.log(`Current balances: ${JSON.stringify(result, null, 2)}`);
          return result;
        })(),
      },
      meta: {
        asMutation: false,
      },
    }),
  ),
  fetchClaimableStakingRewards: createAction(
    'FETCH_CLAIMABLE_STAKING_REWARDS',
    (slotAuctionSdk: SlotAuctionSdk) => ({
      request: {
        promise: (async () => {
          const claimableStakingRewards = await slotAuctionSdk.getClaimableStakingRewards();

          return { claimableStakingRewards };
        })(),
      },
      meta: {
        asMutation: false,
      },
    }),
  ),
  claimStakingRewards: createAction(
    'CLAIM_STAKING_REWARDS',
    (
      slotAuctionSdk: SlotAuctionSdk,
      polkadotAccount: string,
      myLoanId: number,
    ) => ({
      request: {
        promise: (async () => {
          await slotAuctionSdk.claimStakingRewards(
            polkadotAccount,
            myLoanId,
            'ERC20',
          );

          return;
        })(),
      },
      meta: {
        asMutation: true,
      },
    }),
  ),
};
