import Web3 from 'web3';
import Web3Modal, { ICoreOptions } from 'web3modal';
import { createAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';
import { Web3KeyProvider } from '@ankr.com/stakefi-web3';
import { fade, lighten } from '@material-ui/core';
import { ISlotAuctionConfig } from '@ankr.com/stakefi-polkadot/dist/types/config';
import {
  ContractManager,
  SlotAuctionSdk,
  TCrowdloanStatus,
  TNetworkType,
} from '@ankr.com/stakefi-polkadot';
import { BlockchainNetworkId } from '../../../common/types';
import { isMainnet } from '../../../common/const';
import { PALETTE } from '../../../common/themes/mainTheme';
import { providerDefaultOptions } from '../../api/provider';
import { RequestAction } from '@redux-requests/core';
import { NotificationActions } from '../../../store/actions/NotificationActions';

interface IConnect {
  polkadotAccount: string;
  networkType: TNetworkType;
  isConnected: boolean;
}

class Web3KeyProviderParachain extends Web3KeyProvider {
  public async connectFromInjected(): Promise<void> {
    if (this.isConnected()) return;

    const web3Modal = new Web3Modal({
      providerOptions: providerDefaultOptions,
      theme: {
        background: PALETTE.background.paper,
        main: PALETTE.text.primary,
        secondary: fade(PALETTE.text.primary, 0.5),
        border: PALETTE.background.default,
        hover: lighten(PALETTE.background.paper, 0.03),
      },
    } as ICoreOptions);

    const provider = await web3Modal.connect();

    const web3 = new Web3(provider);

    return this.connect(web3);
  }
}

class SlotAuctionSdkSingleton {
  private static sdk?: SlotAuctionSdk;

  public static getInstance(config?: ISlotAuctionConfig): SlotAuctionSdk {
    if (SlotAuctionSdkSingleton.sdk) return SlotAuctionSdkSingleton.sdk;

    SlotAuctionSdkSingleton.sdk = new SlotAuctionSdk(config);

    SlotAuctionSdkSingleton.sdk.initPolkadotProvider();

    return SlotAuctionSdkSingleton.sdk;
  }
}

export const SlotAuctionActions = {
  initialize: createAction(
    'INITIALIZE_SLOT_AUCTION_SDK',
    (config: ISlotAuctionConfig) => ({
      request: {
        promise: (async function () {
          return SlotAuctionSdkSingleton.getInstance(config);
        })(),
      },
      meta: {
        asMutation: false,
      },
    }),
  ),
  connect: createAction<RequestAction<IConnect, IConnect>>(
    'CONNECT_SLOT_AUCTION_SDK',
    (selectedPolkadotAccount?: string) => ({
      request: {
        promise: (async function () {
          const slotAuctionSdk = SlotAuctionSdkSingleton.getInstance();
          if (!slotAuctionSdk.isConnected()) {
            const web3KeyProvider = new Web3KeyProviderParachain({
              // TODO set expectedChainId in runtime depends on current parachain
              expectedChainId: isMainnet
                ? BlockchainNetworkId.mainnet
                : BlockchainNetworkId.goerli,
            });
            // TODO Connection of web3 and polkadot at the same time
            slotAuctionSdk.initWeb3Provider(web3KeyProvider);
            if (!slotAuctionSdk.getKeyProvider().isConnected()) {
              await slotAuctionSdk.getKeyProvider().connectFromInjected();
            }
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
        onSuccess: (response, action, store) => {
          const slotAuctionSdk = SlotAuctionSdkSingleton.getInstance();
          store.dispatchRequest(
            SlotAuctionActions.fetchPolkadotAccounts(slotAuctionSdk),
          );

          store.dispatchRequest(
            SlotAuctionActions.fetchPolkadotBalance(
              slotAuctionSdk,
              response.data.polkadotAccount,
            ),
          );

          store.dispatchRequest(
            SlotAuctionActions.fetchCrowdloanBalances(
              response.data.polkadotAccount,
            ),
          );

          store.dispatchRequest(
            SlotAuctionActions.fetchClaimableStakingRewards(slotAuctionSdk),
          );

          return response;
        },
        onError: (error, action, store) => {
          store.dispatch(
            NotificationActions.showNotification({
              message: error.toString(),
              severity: 'error',
            }),
          );
          throw error;
        },
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
    (polkadotAccount: string) => ({
      request: {
        promise: (async () => {
          const slotAuctionSdk = SlotAuctionSdkSingleton.getInstance();
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
  fetchPolkadotAccounts: createAction(
    'FETCH_POLKADOT_ACCOUNTS',
    (slotAuctionSdk: SlotAuctionSdk) => ({
      request: {
        promise: (async () => {
          let polkadotAccounts: string[] = [];

          if (slotAuctionSdk?.isConnected()) {
            polkadotAccounts = await slotAuctionSdk.getPolkadotAccounts();
          }

          return { polkadotAccounts };
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
        promise: (async () =>
          await slotAuctionSdk.claimStakingRewards(
            polkadotAccount,
            myLoanId,
            'ERC20',
          ))(),
      },
      meta: {
        asMutation: true,
      },
    }),
  ),
  claimRewardPoolTokens: createAction(
    'CLAIM_REWARD_POOL_TOKENS',
    (
      slotAuctionSdk: SlotAuctionSdk,
      polkadotAccount: string,
      loanId: number,
    ) => ({
      request: {
        promise: (async () =>
          await slotAuctionSdk.claimRewardPoolTokens(
            polkadotAccount,
            loanId,
          ))(),
      },
      meta: {
        asMutation: true,
      },
    }),
  ),
  depositFundsToCrowdloan: createAction(
    'DEPOSIT_FUNDS_TO_CROWDLOAN',
    (
      slotAuctionSdk: SlotAuctionSdk,
      polkadotAccount: string,
      loanId: number,
      value: string,
    ) => ({
      request: {
        promise: (async function () {
          return slotAuctionSdk.depositFundsToCrowdloan(
            polkadotAccount,
            loanId,
            new BigNumber(value),
          );
        })(),
      },
      meta: {
        asMutation: true,
      },
    }),
  ),
};
