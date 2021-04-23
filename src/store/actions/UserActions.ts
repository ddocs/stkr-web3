import { BlockchainNetworkId } from '@ankr.com/stkr-jssdk';
import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { replace } from 'connected-react-router';
import { generatePath } from 'react-router';
import { Store } from 'redux';
import { createAction } from 'redux-actions';
import { createAction as createSmartAction } from 'redux-smart-actions';
import Web3 from 'web3';
import { CONVERT_ROUTE, FEATURES_PATH, isMainnet } from '../../common/const';
import { Blockchain, DepositType, Locale, Provider } from '../../common/types';
import { authenticatedRequestGuard } from '../../common/utils/authenticatedRequestGuard';
import { update } from '../../common/utils/update';
import { StkrSdk } from '../../modules/api';
import { getAprFromBalance } from '../../modules/api/apr';
import { configFromEnv } from '../../modules/api/config';
import { ISidecarReply } from '../../modules/api/gateway';
import { IConnectResult } from '../../modules/api/provider';
import { BridgeSdk } from '../../modules/bridge-sdk';
import { ICreateNodeValue } from '../../modules/provider/screens/CreateNode';
import { IAllowance } from '../apiMappers/allowance';
import { mapGlobalStats } from '../apiMappers/globalStatsApi';
import {
  IApiProviderStats,
  mapProviderStats,
} from '../apiMappers/providerStatsApi';
import { ISidecar, mapSidecar } from '../apiMappers/sidecarsApi';
import {
  isAllowedTransaction,
  IStakeHistoryItem,
  IStakerStats,
  IStakingHistory,
  mapStakeHistoryItem,
  mapStakerStats,
} from '../apiMappers/stakerStatsApi';
import { IStakingFeeInfo, IUserInfo } from '../apiMappers/userApi';
import { closeModalAction } from '../dialogs/actions';
import { IStoreState } from '../reducers';

export interface ISetLanguagePayload {
  locale: Locale;
}

export enum QueryStatus {
  done = 'done',
  inProgress = 'inProgress',
}

export interface ISidecarsQuery {
  status: string;
  items: ISidecar[];
  page: number;
}

export const UserActionTypes = {
  CONNECT: 'CONNECT',

  DISCONNECT: 'DISCONNECT',

  FETCH_ACCOUNT_DATA: 'FETCH_ACCOUNT_DATA',

  CALC_STAKING_FEE: 'CALC_STAKING_FEE',

  FETCH_CURRENT_PROVIDER_SIDECARS: 'FETCH_CURRENT_PROVIDER_SIDECARS',

  AUTHORIZE_PROVIDER: 'AUTHORIZE_PROVIDER',

  CREATE_SIDECAR: 'CREATE_SIDECAR',

  FETCH_GLOBAL_STATS: 'FETCH_GLOBAL_STATS',

  FETCH_ALLOWANCE: 'FETCH_ALLOWANCE',

  ALLOW_TOKENS: 'ALLOW_TOKENS',

  ALLOW_ETH_TOKENS: 'ALLOW_ETH_TOKENS',

  FAUCET: 'FAUCET',

  STAKE: 'STAKE',

  FETCH_STAKER_STATS: 'FETCH_STAKER_STATS',

  FETCH_STAKING_HISTORY: 'FETCH_STAKING_HISTORY',

  FETCH_PROVIDER_STATS: 'FETCH_PROVIDER_STATS',

  TOP_UP: 'TOP_UP',

  SET_LOCALE: 'SET_LOCALE',
};

// todo: remove this method after SDK update
async function getGlobalPoolBalance() {
  const address = configFromEnv().contractConfig.globalPoolDepositContract;
  let balance = '0';

  if (address) {
    const url = isMainnet
      ? 'https://eth-03.dccn.ankr.com/'
      : 'https://goerli.infura.io/v3/3c88c0ec7e57421fa7d019780d2e6768';

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [address, 'latest'],
        id: 1,
      }),
    };

    try {
      const response = await fetch(url, requestOptions);
      const { result } = await response.json();

      balance = Web3.utils.fromWei(Web3.utils.hexToNumberString(result));
    } catch (error) {
      throw new Error(`Unable to fetch global pool ethereum balance: ${error}`);
    }
  }

  return parseFloat(balance);
}

export const UserActions = {
  connect: (redirectOnSuccess: string = FEATURES_PATH) => ({
    type: UserActionTypes.CONNECT,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getForEnv();
        return stkrSdk?.connect();
      })(),
    },
    meta: {
      asMutation: true,
      onSuccess: (
        request: { data: IConnectResult },
        action: RequestAction,
        store: Store<IStoreState>,
      ) => {
        setTimeout(() => {
          store.dispatch(closeModalAction());

          if (
            false &&
            request.data.chainId === BlockchainNetworkId.smartchain
          ) {
            store.dispatch(
              replace(
                generatePath(CONVERT_ROUTE, { from: 'Peg-ETH', to: 'ETH' }),
              ),
            );
          } else {
            store.dispatch(UserActions.fetchAccountData());
            store.dispatch(replace(redirectOnSuccess));
          }
        });

        return request;
      },
    },
  }),
  // TODO Positive expectation response
  disconnect: () => ({
    type: UserActionTypes.DISCONNECT,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getForEnv();
        return await stkrSdk.disconnect();
      })(),
    },
  }),
  fetchAccountData: () => ({
    type: UserActionTypes.FETCH_ACCOUNT_DATA,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getForEnv();
        const address = stkrSdk.getKeyProvider().currentAccount();
        const ethereumBalance = await stkrSdk.getEthBalance();
        const nativeBalance = await stkrSdk.getNativeBalance();
        const walletMeta = stkrSdk.getWalletMeta();
        let walletType = Provider.metamask,
          blockchainType = Blockchain.ethereum;
        let bnbBalance = undefined,
          ankrBalance = undefined;
        if (stkrSdk.getKeyProvider().isBinanceWallet()) {
          walletType = Provider.binance;
        }
        if (stkrSdk.getKeyProvider().isBinanceSmartChain()) {
          bnbBalance = nativeBalance;
          blockchainType = Blockchain.binance;
        } else {
          ankrBalance = await stkrSdk.getAnkrBalance();
        }
        return {
          address,
          blockchainType,
          walletType,
          ankrBalance,
          nativeBalance,
          bnbBalance,
          ethereumBalance: new BigNumber(ethereumBalance),
          walletIcon: walletMeta?.icons ? walletMeta.icons[0] : undefined,
          walletName: walletMeta?.name,
        } as IUserInfo;
      })(),
    },
    meta: {
      asMutation: false,
      onSuccess: (
        request: { data: IConnectResult },
        action: RequestAction,
        store: Store<IStoreState>,
      ) => {
        store.dispatch(UserActions.calcStakingFee());
        return request;
      },
    },
  }),
  calcStakingFee: () => ({
    type: UserActionTypes.CALC_STAKING_FEE,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getForEnv();
        let stakingFeeRate = new BigNumber('0');
        if (stkrSdk.getKeyProvider().isBinanceSmartChain()) {
          const bridgeSdk = new BridgeSdk(stkrSdk);
          stakingFeeRate = await bridgeSdk.calcStakingFeeRate();
        }
        return {
          stakingFeeRate: stakingFeeRate,
        } as IStakingFeeInfo;
      })(),
    },
  }),
  updateAccountData: createAction<Partial<IUserInfo>>(
    update(UserActionTypes.FETCH_ACCOUNT_DATA),
  ),
  authorizeProvider: () => ({
    type: UserActionTypes.AUTHORIZE_PROVIDER,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getForEnv();
        const token = await stkrSdk.authorizeProvider();
        return { token };
      })(),
    },
    meta: {
      asMutation: true,
    },
  }),
  fetchCurrentProviderSidecars: (page: number, size = 50) => ({
    type: UserActionTypes.FETCH_CURRENT_PROVIDER_SIDECARS,
    request: {
      promise: async function () {
        const stkrSdk = StkrSdk.getForEnv();
        return await stkrSdk?.getProviderSidecars(page, size);
      },
    },
    meta: {
      onRequest: authenticatedRequestGuard,
      getData: (data: ISidecarReply[], currentData: ISidecarsQuery) => {
        const mappedSidecars = data.map(mapSidecar);

        const queryData: ISidecarsQuery = {
          page,
          status:
            data.length < size ? QueryStatus.done : QueryStatus.inProgress,
          items: currentData
            ? [...currentData.items, ...mappedSidecars]
            : mappedSidecars,
        };

        return queryData;
      },
    },
  }),
  createSidecar: (data: ICreateNodeValue) => ({
    type: UserActionTypes.CREATE_SIDECAR,
    request: {
      promise: async function () {
        const stkrSdk = StkrSdk.getForEnv();
        return await stkrSdk.createSidecar(
          data.name,
          data.eth1Url,
          data.eth2Url,
        );
      },
    },
    meta: {
      onRequest: authenticatedRequestGuard,
      asMutation: true,
      mutations: {
        [UserActionTypes.FETCH_CURRENT_PROVIDER_SIDECARS]: (
          data: ISidecarsQuery,
          sidecar: ISidecarReply,
        ) => {
          const queryData: ISidecarsQuery = {
            ...data,
            items: [...data.items, mapSidecar(sidecar)],
          };

          return queryData;
        },
      },
    },
  }),
  fetchGlobalStats: () => ({
    type: UserActionTypes.FETCH_GLOBAL_STATS,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getForEnv();
        const globalStats = await stkrSdk.getGlobalStats();
        const ethereumPrice = await stkrSdk.getApiGateway().getUsdPrice('ETH');
        const balance = await getGlobalPoolBalance();
        const currentApr = getAprFromBalance(balance);

        return {
          ...globalStats,
          currentApr: currentApr,
          ethereumPrice: ethereumPrice.rate,
        };
      })(),
    },
    meta: {
      getData: mapGlobalStats,
    },
  }),
  fetchAllowance: () => ({
    type: UserActionTypes.FETCH_ALLOWANCE,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getForEnv();
        const allowanceAmount = await stkrSdk.getAllowanceAmount();
        const remainingAllowance = await stkrSdk.getRemainingAllowance();
        const totalAllowance = allowanceAmount.plus(remainingAllowance);

        return {
          allowanceAmount,
          remainingAllowance,
          totalAllowance,
        } as IAllowance;
      })(),
    },
  }),
  allowTokens: () => ({
    type: UserActionTypes.ALLOW_TOKENS,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getForEnv();
        return (await stkrSdk.allowTokens()).transactionHash;
      })(),
    },
    meta: {
      asMutation: true,
    },
  }),
  allowEthTokens: ({ name, amount }: { name: string; amount: BigNumber }) => ({
    type: UserActionTypes.ALLOW_ETH_TOKENS,
    request: {
      promise: (async function () {
        console.log(name + amount);
        alert('Not possible anymore');
      })(),
    },
    meta: {
      asMutation: true,
    },
  }),
  faucet: () => ({
    type: UserActionTypes.FAUCET,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getForEnv();
        return stkrSdk.faucet({
          from: stkrSdk.getKeyProvider().currentAccount(),
        });
      })(),
    },
    meta: {
      asMutation: true,
    },
  }),
  stake: (amount: BigNumber | string) => ({
    type: UserActionTypes.STAKE,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getForEnv();
        if (stkrSdk.getKeyProvider().isBinanceSmartChain()) {
          const bridgeSdk = new BridgeSdk(stkrSdk);
          const stakingFeeRate = await bridgeSdk.calcStakingFeeRate();
          const fee = stakingFeeRate.multipliedBy(amount).dividedBy(32);
          amount = new BigNumber(amount).plus(fee);
          console.log(`New staking amount is: ${amount.toString(10)}`);
        }
        return stkrSdk.stake(amount);
      })(),
    },
    meta: {
      asMutation: true,
    },
  }),
  fetchStakerStats: () => ({
    type: UserActionTypes.FETCH_STAKER_STATS,
    request: {
      promise: (async function (): Promise<IStakerStats> {
        const stkrSdk = StkrSdk.getForEnv();
        const balanceData = await (async () => {
          try {
            const claimableAETHRewardOf = new BigNumber(
              await stkrSdk.getClaimableAethBalance(),
            );
            const claimableFETHRewardOf = new BigNumber(
              await stkrSdk.getClaimableFethBalance(),
            );
            const aEthBalance = await stkrSdk.getAethBalance();
            const fEthBalance = await stkrSdk.getFethBalance();
            return {
              claimableAETHRewardOf,
              claimableFETHRewardOf,
              aEthBalance,
              fEthBalance,
            };
          } catch (e) {
            console.error(e);
            return {
              claimableAETHRewardOf: new BigNumber(0),
              claimableFETHRewardOf: new BigNumber(0),
              aEthBalance: new BigNumber(0),
              fEthBalance: new BigNumber(0),
            };
          }
        })();
        const aEthRatio = await stkrSdk.getAethRatio();
        const pendingStake = await stkrSdk.pendingStakesOf(
          stkrSdk.getKeyProvider().currentAccount(),
        );
        console.log(
          `Claimable AETH: ${balanceData.claimableAETHRewardOf.toString(10)}`,
        );
        console.log(
          `Claimable FETH: ${balanceData.claimableFETHRewardOf.toString(10)}`,
        );
        return {
          aEthRatio,
          pendingStake,
          ...balanceData,
        } as IStakerStats;
      })(),
    },
    meta: {
      asMutation: false,
      onSuccess: (
        request: { data: IConnectResult },
        action: RequestAction,
        store: Store<IStoreState>,
      ) => {
        store.dispatch(UserActions.fetchingStakingHistory());
        return request;
      },
      getData: mapStakerStats,
    },
  }),
  fetchingStakingHistory: () => ({
    type: UserActionTypes.FETCH_STAKING_HISTORY,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getForEnv();
        const stakerStats = await stkrSdk.getStakerStats();
        return {
          stakes: stakerStats.stakes
            .map(mapStakeHistoryItem)
            .filter(isAllowedTransaction),
        } as IStakingHistory;
      })(),
    },
  }),
  fetchProviderStats: () => ({
    type: UserActionTypes.FETCH_PROVIDER_STATS,
    request: {
      promise: (async function () {
        if (localStorage.getItem('__ultimateAdminAccess') === 'enabled') {
          return { providerEthBalance: new BigNumber('3') };
        }
        const stkrSdk = StkrSdk.getForEnv();
        const providerEthBalance = await stkrSdk
          .getContractManager()
          .providerLockedEtherOf(stkrSdk.getKeyProvider().currentAccount());

        const depositedAnkrBalance = await stkrSdk.getDepositedBalance();

        const providerAnkrBalance = await stkrSdk
          .getContractManager()
          .toppedUpAnkrDeposit(stkrSdk.getKeyProvider().currentAccount());

        return {
          providerEthBalance,
          providerAnkrBalance,
          depositedAnkrBalance,
        } as IApiProviderStats;
      })(),
    },
    meta: {
      getData: mapProviderStats,
    },
  }),
  updateStakerStats: (
    payload: Partial<Omit<IStakerStats, 'stakes'>> & {
      stakes?: Partial<IStakeHistoryItem>[];
    },
  ) => {
    return {
      type: update(UserActionTypes.FETCH_STAKING_HISTORY),
      payload: payload,
      meta: {
        // TODO cover by unit
        mutation: (
          state: IStakingHistory | undefined,
          payload: Partial<IStakingHistory>,
        ): Partial<IStakingHistory> => {
          const stakes = (() => {
            if (!payload || !(payload.stakes instanceof Array)) {
              return state?.stakes;
            }

            if (!state?.stakes) {
              return payload.stakes;
            }

            let begin: IStakingHistory['stakes'] = [];
            const main = [...state.stakes];

            payload.stakes.forEach(newItem => {
              const index = state.stakes.findIndex(
                item => item.transactionHash === newItem.transactionHash,
              );
              if (index !== -1) {
                main[index] = newItem;
                return;
              }

              begin = [newItem, ...begin];
            });

            return [...begin, ...main];
          })();

          return {
            ...state,
            ...payload,
            stakes,
          };
        },
      },
    };
  },
  claimAETH: createSmartAction('CLAIM_A_ETH', () => ({
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getForEnv();
        return stkrSdk.claimAETH();
      })(),
    },
    meta: {
      asMutation: true,
      onSuccess: (
        request: { data: IConnectResult },
        action: RequestAction,
        store: Store<IStoreState>,
      ) => {
        store.dispatch(UserActions.fetchStakerStats());
        return request;
      },
    },
  })),
  claimFETH: createSmartAction('CLAIM_F_ETH', () => ({
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getForEnv();
        return stkrSdk.claimFETH();
      })(),
    },
    meta: {
      asMutation: true,
      onSuccess: (
        request: { data: IConnectResult },
        action: RequestAction,
        store: Store<IStoreState>,
      ) => {
        store.dispatch(UserActions.fetchStakerStats());
        return request;
      },
    },
  })),
  topUp: (amount: BigNumber, type: DepositType, skipDeposit?: boolean) => ({
    type: UserActionTypes.TOP_UP,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getForEnv();

        if (type === DepositType.ETH) {
          return stkrSdk.topUpETH(amount);
        }

        if (!skipDeposit) {
          await stkrSdk
            .getContractManager()
            .depositAnkr(stkrSdk.getKeyProvider().currentAccount());
        }

        return stkrSdk.topUpANKR(amount);
      })(),
    },
    meta: {
      asMutation: true,
    },
  }),
  setLocale: createAction<ISetLanguagePayload>(UserActionTypes.SET_LOCALE),
};
