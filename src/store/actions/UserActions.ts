import { IUserInfo } from '../apiMappers/userApi';
import { Providers } from '../../common/types';
import { StkrSdk } from '../../modules/api';
import BigNumber from 'bignumber.js';
import { MicroPoolReply, SidecarReply, SidecarStatusReply, } from '../../modules/api/gateway';
import { IMicropool, mapMicropool } from '../apiMappers/poolsApi';
import { ISidecar, mapSidecar } from '../apiMappers/sidecarsApi';
import { mapProviderStats } from '../apiMappers/providerStatsApi';
import { IAllowance } from '../apiMappers/allowance';
import { mapStakerStats } from '../apiMappers/stakerStatsApi';
import { authenticatedGuard } from '../../common/utils/authenticatedGuard';
import { RequestAction } from '@redux-requests/core';
import { Store } from 'redux';
import { IStoreState } from '../reducers';
import { ISidecarStatus, mapNodeStatus } from '../apiMappers/sidecarStatus';
import { PICKER_PATH } from '../../common/const';
import { closeModalAction } from '../modals/actions';
import { replace } from 'connected-react-router';
import { update } from '../../common/utils/update';
import { createAction } from 'redux-actions';

export const UserActionTypes = {
  CONNECT: 'CONNECT',

  DISCONNECT: 'DISCONNECT',

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

  ALLOW_ETH_TOKENS: 'ALLOW_ETH_TOKENS',

  BUY_TOKENS: 'BUY_TOKENS',

  STAKE: 'STAKE',

  UNSTAKE: 'UNSTAKE',

  CLAIM_A_ETH: 'CLAIM_A_ETH',

  FETCH_STAKER_STATS: 'FETCH_STAKER_STATS',
};

export const UserActions = {
  connect: () => ({
    type: UserActionTypes.CONNECT,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return await stkrSdk?.connectMetaMask();
      })(),
    },
    meta: {
      asMutation: true,
      onSuccess: (
        request: null,
        action: RequestAction,
        store: Store<IStoreState>,
      ) => {
        store.dispatch(UserActions.fetchAccountData());
        store.dispatch(closeModalAction());
        store.dispatch(replace(PICKER_PATH));
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
  fetchMicropools: () => ({
    type: UserActionTypes.FETCH_MICROPOOLS,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return stkrSdk.getApiGateway().getMicroPools();
      })(),
    },
    meta: {
      getData: (data: MicroPoolReply[]): IMicropool[] => data.map(mapMicropool),
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
      getData: (data: MicroPoolReply[]): IMicropool[] => {
        return data.map(mapMicropool);
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
      getData: (data: SidecarStatusReply): ISidecarStatus => {
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
        console.log(name);
        alert('Not possible anymore');
      })(),
    },
    meta: {
      asMutation: true,
      mutations: {
        [UserActionTypes.FETCH_CURRENT_PROVIDER_MICROPOOLS]: (
          data: ISidecar[],
          item: MicroPoolReply,
        ) => {
          return [...data, mapMicropool(item)];
        },
      },
    },
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
        const aEthBalance = await stkrSdk
          .getContractManager()
          .claimableRewardOf(stkrSdk.getKeyProvider().currentAccount());
        return {
          aEthBalance,
          ...(await stkrSdk.getStakerStats()),
        };
      })(),
    },
    meta: {
      getData: mapStakerStats,
    },
  }),
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
};
