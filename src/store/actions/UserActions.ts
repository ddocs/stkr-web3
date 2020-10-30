import { IUserInfo } from '../apiMappers/userApi';
import { Providers } from '../../common/types';
import { StkrSdk } from '../../modules/api';
import BigNumber from 'bignumber.js';
import {
  MicroPoolReply,
  SidecarReply,
  SidecarStatusReplay,
} from '../../modules/api/gateway';
import { IPool } from '../apiMappers/poolsApi';
import { differenceInCalendarMonths } from 'date-fns';
import { ISidecar, mapSidecar } from '../apiMappers/sidecarsApi';
import { mapProviderStats } from '../apiMappers/providerStatsApi';
import { IAllowance, IAllowTokensResponse } from '../apiMappers/allowance';
import { mapStakerStats } from '../apiMappers/stakerStatsApi';
import { authenticatedGuard } from '../../common/utils/authenticatedGuard';
import { RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { IStoreState } from '../reducers';
import { ISidecarStatus, mapNodeStatus } from '../apiMappers/sidecarStatus';

export const UserActionTypes = {
  CONNECT: 'CONNECT',

  DISCONNECT: 'DISCONNECT',
  DISCONNECT_SUCCESS: 'DISCONNECT_SUCCESS',

  FETCH_ACCOUNT_DATA: 'FETCH_ACCOUNT_DATA',

  FETCH_MICROPOOLS: 'FETCH_MICROPOOLS',

  FETCH_CURRENT_PROVIDER_MICROPOOLS: 'FETCH_CURRENT_PROVIDER_MICROPOOLS',

  FETCH_CURRENT_PROVIDER_SIDECARS: 'FETCH_CURRENT_PROVIDER_SIDECARS',

  FETCH_SIDECAR_STATUS: 'FETCH_SIDECAR_STATUS',

  AUTHORIZE_PROVIDER: 'AUTHORIZE_PROVIDER',

  CREATE_SIDECAR: 'CREATE_SIDECAR',

  CREATE_MICROPOOL: 'CREATE_MICROPOOL',

  FETCH_PROVIDER_STATS: 'FETCH_PROVIDER_STATS',

  FETCH_ALLOWANCE: 'FETCH_ALLOWANCE',

  ALLOW_TOKENS: 'ALLOW_TOKENS',

  BUY_TOKENS: 'BUY_TOKENS',

  STAKE: 'STAKE',

  FETCH_STAKER_STATS: 'FETCH_STAKER_STATS',
};

export const UserActions = {
  connect: () => ({
    type: UserActionTypes.CONNECT,
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
  fetchMicropools: () => ({
    type: UserActionTypes.FETCH_MICROPOOLS,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return stkrSdk.getApiGateway().getMicroPools();
      })(),
    },
    meta: {
      getData: (data: MicroPoolReply[]): IPool[] =>
        data.map(item => ({
          name: item.name,
          provider: item.provider,
          period: differenceInCalendarMonths(item.startTime, item.endTime),
          fee: new BigNumber('0'),
          currentStake: new BigNumber(item.balance),
          totalStake: new BigNumber('32'),
          status: item.status,
          transactionHash: item.transactionHash,
        })),
    },
  }),
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
  fetchCurrentProviderMicropools: () => ({
    type: UserActionTypes.FETCH_CURRENT_PROVIDER_MICROPOOLS,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return stkrSdk
          ?.getApiGateway()
          .getMicroPoolsByProvider(stkrSdk.getKeyProvider().currentAccount());
      })(),
    },
    meta: {
      getData: (data: MicroPoolReply[]): IPool[] => {
        return data.map(item => ({
          name: item.name,
          provider: item.provider,
          period: differenceInCalendarMonths(item.startTime, item.endTime),
          fee: new BigNumber(0),
          currentStake: new BigNumber(item.balance),
          totalStake: new BigNumber(32),
          status: item.status,
          transactionHash: item.transactionHash,
        }));
      },
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
      onRequest: authenticatedGuard,
      onSuccess: (
        request: { data: ISidecar[] },
        action: RequestAction,
        store: Store<IStoreState>,
      ) => {
        request.data.map(item => item.id);

        request.data.forEach(item => {
          store.dispatch(UserActions.fetchSidecarStatus(item.id));
        });

        return request;
      },
      getData: (data: SidecarReply[]): ISidecar[] => {
        return data.map(mapSidecar);
      },
    },
  }),
  fetchSidecarStatus: (id: string) => ({
    type: UserActionTypes.FETCH_SIDECAR_STATUS,
    request: {
      promise: async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return await stkrSdk.getSidecarStatus(id);
      },
    },
    meta: {
      onRequest: authenticatedGuard,
      getData: (data: SidecarStatusReplay): ISidecarStatus => {
        return mapNodeStatus(data);
      },
      requestKey: id,
    },
  }),
  createSidecar: () => ({
    type: UserActionTypes.CREATE_SIDECAR,
    request: {
      promise: async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return await stkrSdk.createSidecar();
      },
    },
    meta: {
      onRequest: authenticatedGuard,
      asMutation: true,
      mutations: {
        [UserActionTypes.FETCH_CURRENT_PROVIDER_SIDECARS]: (
          data: ISidecar[],
          item: { sidecar: SidecarReply },
        ) => {
          return [...data, mapSidecar(item.sidecar)] as ISidecar[];
        },
      },
    },
  }),
  createMicropool: ({ name }: { name: string }) => ({
    type: UserActionTypes.CREATE_MICROPOOL,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        // TODO Remove log
        try {
          return await stkrSdk.createAnkrMicroPool(name);
        } catch (e) {
          console.error(e);
          throw e;
        }
      })(),
    },
    meta: { asMutation: true },
  }),
  fetchProviderStats: () => ({
    type: UserActionTypes.FETCH_PROVIDER_STATS,
    request: {
      promise: async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return await stkrSdk.getProviderStats();
      },
    },
    meta: {
      getData: mapProviderStats,
      onRequest: authenticatedGuard,
    },
  }),
  fetchAllowance: () => ({
    type: UserActionTypes.FETCH_ALLOWANCE,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return {
          allowanceAmount: await stkrSdk.getAllowanceAmount(),
          remainingAllowance: await stkrSdk.getRemainingAllowance(),
        } as IAllowance;
      })(),
    },
  }),
  allowTokens: () => ({
    type: UserActionTypes.ALLOW_TOKENS,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        try {
          return {
            txHash: await stkrSdk.allowTokens(),
          } as IAllowTokensResponse;
        } catch (e) {
          console.error(e);
          throw e;
        }
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
  fetchStakerStats: () => ({
    type: UserActionTypes.FETCH_STAKER_STATS,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return await stkrSdk.getStakerStats();
      })(),
    },
    meta: {
      getData: mapStakerStats,
    },
  }),
};
