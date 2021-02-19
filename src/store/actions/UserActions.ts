import { BlockchainNetworkId } from '@ankr.com/stkr-jssdk';
import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { replace } from 'connected-react-router';
import { generatePath } from 'react-router';
import { Store } from 'redux';
import { createAction } from 'redux-actions';
import { CONVERT_ROUTE, PICKER_PATH } from '../../common/const';
import { Blockchain, DepositType, Locale, Provider } from '../../common/types';
import { authenticatedRequestGuard } from '../../common/utils/authenticatedRequestGuard';
import { update } from '../../common/utils/update';
import { StkrSdk } from '../../modules/api';
import { ISidecarReply } from '../../modules/api/gateway';
import { IConnectResult } from '../../modules/api/provider';
import { ICreateNodeValue } from '../../modules/provider/screens/CreateNode';
import { IAllowance } from '../apiMappers/allowance';
import { mapGlobalStats } from '../apiMappers/globalStatsApi';
import { mapProviderStats } from '../apiMappers/providerStatsApi';
import { ISidecar, mapSidecar } from '../apiMappers/sidecarsApi';
import {
  IStakeHistoryItem,
  IStakerStats,
  mapStakerStats,
} from '../apiMappers/stakerStatsApi';
import { IUserInfo } from '../apiMappers/userApi';
import { closeModalAction } from '../dialogs/actions';
import { IStoreState } from '../reducers';
import { BridgeSdk } from '../../modules/bridge-sdk';

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

  FETCH_CURRENT_PROVIDER_SIDECARS: 'FETCH_CURRENT_PROVIDER_SIDECARS',

  AUTHORIZE_PROVIDER: 'AUTHORIZE_PROVIDER',

  CREATE_SIDECAR: 'CREATE_SIDECAR',

  FETCH_GLOBAL_STATS: 'FETCH_GLOBAL_STATS',

  FETCH_ALLOWANCE: 'FETCH_ALLOWANCE',

  ALLOW_TOKENS: 'ALLOW_TOKENS',

  ALLOW_ETH_TOKENS: 'ALLOW_ETH_TOKENS',

  FAUCET: 'FAUCET',

  STAKE: 'STAKE',

  UNSTAKE: 'UNSTAKE',

  CLAIM_A_ETH: 'CLAIM_A_ETH',

  FETCH_STAKER_STATS: 'FETCH_STAKER_STATS',

  FETCH_PROVIDER_STATS: 'FETCH_PROVIDER_STATS',

  TOP_UP: 'TOP_UP',

  SET_LOCALE: 'SET_LOCALE',
};

export const UserActions = {
  connect: (redirectOnSuccess: string = PICKER_PATH) => ({
    type: UserActionTypes.CONNECT,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getForEnv();
        return await stkrSdk?.connect();
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
        let stakingFeeRate = new BigNumber('0');
        if (stkrSdk.getKeyProvider().isBinanceSmartChain()) {
          const bridgeSdk = new BridgeSdk(stkrSdk);
          stakingFeeRate = await bridgeSdk.calcStakingFeeRate();
        }
        return {
          address,
          blockchainType,
          walletType,
          ethereumBalance: new BigNumber(ethereumBalance),
          ankrBalance: ankrBalance,
          nativeBalance,
          bnbBalance,
          stakingFeeRate,
        } as IUserInfo;
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
        const data: ISidecarReply[] = await stkrSdk?.getProviderSidecars(
          page,
          size,
        );

        return data;
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
          data: ISidecar[],
          sidecar: ISidecarReply,
        ) => {
          return [...data, mapSidecar(sidecar)] as ISidecar[];
        },
      },
    },
  }),
  fetchGlobalStats: () => ({
    type: UserActionTypes.FETCH_GLOBAL_STATS,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getForEnv();
        return await stkrSdk.getGlobalStats();
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
  unstake: () => ({
    type: UserActionTypes.UNSTAKE,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getForEnv();
        return stkrSdk.unstake();
      })(),
    },
    meta: {
      asMutation: true,
    },
  }),
  fetchStakerStats: () => ({
    type: UserActionTypes.FETCH_STAKER_STATS,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getForEnv();
        const aEthClaimableBalance = await stkrSdk.getClaimableAethBalance();

        const aEthRatio = await stkrSdk.getAethRatio();
        const aEthBalance = await stkrSdk.getAethBalance();
        const pendingStake = await stkrSdk.pendingStakesOf(
          stkrSdk.getKeyProvider().currentAccount(),
        );

        return {
          aEthClaimableBalance,
          aEthBalance: aEthBalance,
          aEthRatio,
          pendingStake,
          ...(await stkrSdk.getStakerStats()),
        };
      })(),
    },
    meta: {
      getData: mapStakerStats,
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
        return { providerEthBalance };
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
      type: update(UserActionTypes.FETCH_STAKER_STATS),
      payload: payload,
      meta: {
        // TODO cover by unit
        mutation: (
          state: IStakerStats | undefined,
          payload: Partial<IStakerStats>,
        ): Partial<IStakerStats> => {
          const stakes = (() => {
            if (!payload || !(payload.stakes instanceof Array)) {
              return state?.stakes;
            }

            if (!state?.stakes) {
              return payload.stakes;
            }

            let begin: IStakerStats['stakes'] = [];
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
  claimAeth: () => ({
    type: UserActionTypes.CLAIM_A_ETH,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getForEnv();
        return stkrSdk.claimAeth();
      })(),
    },
    meta: {
      asMutation: true,
    },
  }),
  topUp: (amount: BigNumber, type: DepositType) => ({
    type: UserActionTypes.TOP_UP,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getForEnv();

        if (type === DepositType.ETH) {
          return stkrSdk.topUpETH(amount);
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
