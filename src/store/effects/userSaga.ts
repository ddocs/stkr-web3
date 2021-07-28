import { getQuery, resetRequests, success } from '@redux-requests/core';
import { END, eventChannel } from 'redux-saga';
import {
  call,
  cancel,
  cancelled,
  fork,
  put,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';
import {
  BRIDGE_PATH,
  BRIDGE_RECOVERY_PATH,
  STAKER_AVALANCHE_PATH,
} from '../../common/const';
import { historyInstance } from '../../common/utils/historyInstance';
import { pushEvent } from '../../common/utils/pushEvent';
import { StkrSdk } from '../../modules/api';
import {
  ContractManagerEvent,
  ContractManagerEvents,
  KeyProviderEvent,
  KeyProviderEvents,
} from '../../modules/api/event';
import {
  clearStakingSession,
  getStakingSession,
} from '../../modules/avalanche-sdk/utils';
import { CrossChainEvent } from '../../modules/cross-chain-sdk/events';
import { AvalancheActions } from '../actions/AvalancheActions';
import {
  GovernanceActions,
  GovernanceActionTypes,
} from '../actions/GovernanceActions';
import { NotificationActionsTypes } from '../actions/NotificationActions';
import { UserActions, UserActionTypes } from '../actions/UserActions';
import { IConnectResponse } from '../apiMappers/connectApi';
import { IUserInfo } from '../apiMappers/userApi';
import { IApplicationStore } from '../createStore';

function createEventChannel() {
  return eventChannel(emitter => {
    const events = StkrSdk.getForEnv().getEventEmitter();

    [
      ...Object.values(KeyProviderEvents),
      ...Object.values(ContractManagerEvents),
      ...Object.values(CrossChainEvent),
    ].forEach(value => {
      events.on(value, data => {
        emitter({ data, type: value });
      });
    });

    events.on(KeyProviderEvents.Disconnect, () => {
      emitter(END);
    });

    return () => {
      events.removeAllListeners();
    };
  });
}

function* listenKeyProviderEvents() {
  const channel = yield call(createEventChannel);

  try {
    while (true) {
      const isBridgePath = historyInstance.location.pathname === BRIDGE_PATH;
      const isAvalancheStakePath =
        historyInstance.location.pathname === STAKER_AVALANCHE_PATH;
      const isBridgeRecoveryPath =
        historyInstance.location.pathname === BRIDGE_RECOVERY_PATH;
      const search = historyInstance.location.search;

      const event: KeyProviderEvent &
        ContractManagerEvent &
        CrossChainEvent = yield take(channel);

      if (event.type === KeyProviderEvents.ChainChanged) {
        if (isBridgePath) {
          yield put(UserActions.disconnect(BRIDGE_PATH, search));
          return;
        } else if (isAvalancheStakePath) {
          yield put(UserActions.disconnect(STAKER_AVALANCHE_PATH, search));
          return;
        }

        yield put(UserActions.disconnect());
        setTimeout(() => {
          window.location.reload();
        });
      } else if (event.type === KeyProviderEvents.AccountChanged) {
        const address =
          event.data.accounts.length > 0 ? event.data.accounts[0] : undefined;

        const { currentAddress } = yield select((store: IApplicationStore) => {
          const currentAddress = getQuery<IUserInfo | undefined>(store, {
            type: UserActionTypes.FETCH_ACCOUNT_DATA,
          }).data?.address;
          return { currentAddress };
        });

        if (currentAddress.toLowerCase() !== address?.toLowerCase()) {
          if (isBridgePath) {
            yield put(UserActions.disconnect(BRIDGE_PATH, search));
          } else if (isAvalancheStakePath) {
            yield put(UserActions.disconnect(STAKER_AVALANCHE_PATH, search));
            return;
          } else if (isBridgeRecoveryPath) {
            yield put(UserActions.disconnect(BRIDGE_RECOVERY_PATH));
            return;
          } else {
            yield put(UserActions.disconnect());
            setTimeout(() => {
              window.location.reload();
            });
          }
        }
      } else if (event.type === KeyProviderEvents.Disconnect) {
        if (isBridgePath) {
          yield put(UserActions.disconnect(BRIDGE_PATH));
          return;
        } else if (isBridgeRecoveryPath) {
          yield put(UserActions.disconnect(BRIDGE_RECOVERY_PATH));
          return;
        }

        yield put(UserActions.disconnect());
        setTimeout(() => {
          window.location.reload();
        });
      } else if (event.type === ContractManagerEvents.AnkrBalanceChanged) {
        yield put(
          UserActions.updateAccountData({
            ankrBalance: event.data.balance,
          }),
        );
      } else if (event.type === ContractManagerEvents.EthereumBalanceChanged) {
        yield put(
          UserActions.updateAccountData({
            ethereumBalance: event.data.balance,
          }),
        );
        yield put(GovernanceActions.fetchClaimAmount());
      } else if (event.type === ContractManagerEvents.AethBalanceChanged) {
        // TODO test it
        yield put(
          UserActions.updateStakerStats({
            claimableAETHRewardOf: event.data.balance,
          }),
        );
      } else if (event.type === ContractManagerEvents.StakePending) {
        yield put(
          UserActions.updateStakerStats({
            stakes: [
              {
                transactionHash: event.data.eventLog.transactionHash,
                amount: event.data.amount,
                action: 'STAKE_ACTION_PENDING',
              },
            ],
          }),
        );
      } else if (event.type === ContractManagerEvents.StakeConfirmed) {
        yield put(
          UserActions.updateStakerStats({
            stakes: [
              {
                transactionHash: event.data.eventLog.transactionHash,
                amount: event.data.amount,
                action: 'STAKE_ACTION_CONFIRMED',
              },
            ],
          }),
        );
      } else if (event.type === ContractManagerEvents.AnkrDepositAllowed) {
        yield put(UserActions.fetchAllowance());
      } else if (event.type === ContractManagerEvents.ProviderToppedUpAnkr) {
        yield put(UserActions.fetchProviderStats());
        yield put(UserActions.fetchingStakingHistory());
      } else if (event.type === ContractManagerEvents.AnkrClaimed) {
        yield put(GovernanceActions.fetchClaimAmount());
      } else if (event.type === CrossChainEvent.aAVAXbClaimFinished) {
        const stakingSession = getStakingSession();
        const { depositTxHash } = event.data;
        if (
          stakingSession?.inProgress &&
          stakingSession.transactionHash === depositTxHash
        ) {
          clearStakingSession();
        }
        yield put(AvalancheActions.checkWallet());
      }
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

function* onConnectSuccess(action: {
  type: string;
  response: { data: IConnectResponse };
}) {
  pushEvent('login', { method: 'web3' });
  const listenKeyProviderEventsTask = yield fork(listenKeyProviderEvents);
  yield take([UserActionTypes.DISCONNECT, UserActionTypes.CONNECT]);
  yield cancel(listenKeyProviderEventsTask);
}

function* onDisconnectSuccess() {
  const actions = [
    ...Object.keys(UserActionTypes),
    ...Object.keys(GovernanceActionTypes),
    ...Object.keys(NotificationActionsTypes),
  ];

  yield put(resetRequests(actions));
  try {
    // TODO Can be excess
    const stkrSdk = StkrSdk.getForEnv();
    yield stkrSdk?.disconnect();
  } catch (error) {
    console.error(error);
  }
}

export function* userSaga() {
  yield takeEvery(success(UserActionTypes.CONNECT), onConnectSuccess);
  yield takeEvery(success(UserActionTypes.DISCONNECT), onDisconnectSuccess);
}
