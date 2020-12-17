import { IUserInfo } from '../apiMappers/userApi';
import { DepositType, Locale, Providers } from '../../common/types';
import { StkrSdk } from '../../modules/api';
import BigNumber from 'bignumber.js';
import { SidecarReply } from '../../modules/api/gateway';
import { ISidecar, mapSidecar } from '../apiMappers/sidecarsApi';
import { mapGlobalStats } from '../apiMappers/globalStatsApi';
import { IAllowance } from '../apiMappers/allowance';
import {
  IStakeHistoryItem,
  IStakerStats,
  mapStakerStats,
} from '../apiMappers/stakerStatsApi';
import { authenticatedRequestGuard } from '../../common/utils/authenticatedRequestGuard';
import { RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { IStoreState } from '../reducers';
import { PICKER_PATH } from '../../common/const';
import { closeModalAction } from '../modals/actions';
import { replace } from 'connected-react-router';
import { update } from '../../common/utils/update';
import { createAction } from 'redux-actions';
import { mapProviderStats } from '../apiMappers/providerStatsApi';
import { ICreateNodeValue } from '../../modules/provider/screens/CreateNode';
import { mapProviderRewards } from '../apiMappers/rewardsMapper';

export interface ISetLanguagePayload {
  locale: Locale;
}

export const UserActionTypes = {
  CONNECT: 'CONNECT',

  DISCONNECT: 'DISCONNECT',

  FETCH_ACCOUNT_DATA: 'FETCH_ACCOUNT_DATA',

  FETCH_CURRENT_PROVIDER_SIDECARS: 'FETCH_CURRENT_PROVIDER_SIDECARS',

  AUTHORIZE_PROVIDER: 'AUTHORIZE_PROVIDER',

  CREATE_SIDECAR: 'CREATE_SIDECAR',

  FETCH_GLOBAL_STATS: 'FETCH_GLOBAL_STATS',

  FETCH_PROVIDER_REWARDS: 'FETCH_PROVIDER_REWARDS',

  FETCH_SIDECAR_REWARDS: 'FETCH_SIDECAR_REWARDS',

  FETCH_ALLOWANCE: 'FETCH_ALLOWANCE',

  ALLOW_TOKENS: 'ALLOW_TOKENS',

  ALLOW_ETH_TOKENS: 'ALLOW_ETH_TOKENS',

  BUY_TOKENS: 'BUY_TOKENS',

  STAKE: 'STAKE',

  UNSTAKE: 'UNSTAKE',

  CLAIM_A_ETH: 'CLAIM_A_ETH',

  FETCH_STAKER_STATS: 'FETCH_STAKER_STATS',

  FETCH_PROVIDER_STATS: 'FETCH_PROVIDER_STATS',

  TOP_UP: 'TOP_UP',

  SET_LOCALE: 'SET_LOCALE',
};

export const UserActions = {
  connect: () => ({
    type: UserActionTypes.CONNECT,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return await stkrSdk?.connect();
      })(),
    },
    meta: {
      asMutation: true,
      onSuccess: (
        request: null,
        action: RequestAction,
        store: Store<IStoreState>,
      ) => {
        setTimeout(() => {
          store.dispatch(UserActions.fetchAccountData());
          store.dispatch(closeModalAction());
          store.dispatch(replace(PICKER_PATH));
        });
      },
    },
  }),
  // TODO Positive expectation response
  disconnect: () => ({
    type: UserActionTypes.DISCONNECT,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return await stkrSdk.disconnect();
      })(),
    },
  }),
  fetchAccountData: () => ({
    type: UserActionTypes.FETCH_ACCOUNT_DATA,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        const address = stkrSdk.getKeyProvider().currentAccount();
        const ankrBalance = await stkrSdk.getAnkrBalance();
        const ethereumBalance = await stkrSdk.getEtheremBalance();

        return {
          address,
          walletType: Providers.metamask,
          ethereumBalance: new BigNumber(ethereumBalance.available),
          ankrBalance: new BigNumber(ankrBalance.available),
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
        const stkrSdk = StkrSdk.getLastInstance();
        return await stkrSdk.authorizeProvider();
      })(),
    },
    meta: {
      asMutation: true,
    },
  }),
  fetchCurrentProviderSidecars: () => ({
    type: UserActionTypes.FETCH_CURRENT_PROVIDER_SIDECARS,
    request: {
      promise: async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        const data: SidecarReply[] = await stkrSdk?.getProviderSidecars();

        return data;
      },
    },
    meta: {
      onRequest: authenticatedRequestGuard,
      getData: (data: SidecarReply[]): ISidecar[] => {
        return data.map(mapSidecar);
      },
    },
  }),
  createSidecar: (data: ICreateNodeValue) => ({
    type: UserActionTypes.CREATE_SIDECAR,
    request: {
      promise: async function () {
        const stkrSdk = StkrSdk.getLastInstance();
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
          sidecar: SidecarReply,
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
        const stkrSdk = StkrSdk.getLastInstance();
        return await stkrSdk.getGlobalStats();
      })(),
    },
    meta: {
      getData: mapGlobalStats,
    },
  }),
  fetchProviderRewards: () => ({
    type: UserActionTypes.FETCH_PROVIDER_REWARDS,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return await stkrSdk.getProviderRewards();
      })(),
    },
    meta: {
      getData: mapProviderRewards,
    },
  }),
  fetchSidecarRewards: ({ sidecar }: { sidecar: string }) => ({
    type: UserActionTypes.FETCH_SIDECAR_REWARDS,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return await stkrSdk.getSidecarRewards(sidecar);
      })(),
    },
    meta: {
      getData: mapProviderRewards,
    },
  }),
  fetchAllowance: () => ({
    type: UserActionTypes.FETCH_ALLOWANCE,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
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
        const stkrSdk = StkrSdk.getLastInstance();
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
  buyTokens: () => ({
    type: UserActionTypes.BUY_TOKENS,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return stkrSdk.faucet();
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
        const stkrSdk = StkrSdk.getLastInstance();
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
        const stkrSdk = StkrSdk.getLastInstance();
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
        const stkrSdk = StkrSdk.getLastInstance();
        const aEthClaimableBalance = await stkrSdk
          .getContractManager()
          .claimableRewardOf(stkrSdk.getKeyProvider().currentAccount());

        const aEthRatio = await stkrSdk.getAethRatio();
        const aEthBalance = await stkrSdk.getAethBalance();

        return {
          aEthClaimableBalance,
          aEthBalance: aEthBalance.available,
          aEthRatio,
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
        const stkrSdk = StkrSdk.getLastInstance();
        const providerEthBalance = await stkrSdk
          .getContractManager()
          .etherBalanceOf(stkrSdk.getKeyProvider().currentAccount());
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
        const stkrSdk = StkrSdk.getLastInstance();
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
        const stkrSdk = StkrSdk.getLastInstance();

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
