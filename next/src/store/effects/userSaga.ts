import { put, takeEvery } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import { UserActions, UserActionTypes } from '../actions/UserActions';
import Web3 from 'web3';
import { artifacts } from '../artifacts/artifacts';
import { createErrorAction } from '../../common/utils/createErrorAction';
import { createSuccessAction } from '../../common/utils/createSuccessAction';

function getContract(contract: keyof typeof artifacts) {
  let contractData = new window.web3.eth.Contract(
    artifacts[contract].abi,
    artifacts[contract].address,
    { from: window.ethereum.selectedAddress },
  );
  window.contracts[contract] = contractData;
  return contractData;
}

function* getUserMicropools() {
  const contract = yield getContract('Micropool');
  const poolEvents = yield contract.getPastEvents('PoolCreated', {
    fromBlock: 0,
  });
  window.micropool = contract;
  const pools = [];
  for (const event of poolEvents) {
    // TODO: this will be taken from backend
    const index = yield event.returnValues.poolIndex;
    const info = yield contract.methods.poolDetails(index).call();

    info.stakeable = Number(info.status) === 0;
    info.poolIndex = index;
    info.totalStakedAmount = Web3.utils.fromWei(info.totalStakedAmount);
    pools.push(info);
  }

  return pools;
}

function* getProviders() {
  const providerContract = yield getContract('Provider');
  const stakingContract = yield getContract('Staking');
  console.log('provider contract is ', providerContract);
  window.provider = providerContract;

  const appliedEvents = yield providerContract.getPastEvents('Applied', {
    fromBlock: 0,
  });

  console.log('applied events', appliedEvents);
  const statusChangeEvents = yield providerContract.getPastEvents(
    'StatusChanged',
  );
  console.log('status change events ', statusChangeEvents);
  const providers = [];
  for (const event of appliedEvents) {
    // TODO: this will be taken from backend
    const provider = yield event.returnValues.provider;
    const info = yield providerContract.methods
      .getProviderInfo(provider)
      .call();

    providers.push({
      name: Web3.utils.hexToAscii(info.name),
      address: provider,
      stakes: yield stakingContract.methods
        ._stakes(event.returnValues.provider)
        .call(),
      status: Number(info.status) === 0 ? 'Active' : 'Blocked',
    });
  }
  return providers;
}

function* getStakeStats() {
  const stakingContract = yield getContract('Staking');
  const ankrContract = yield getContract('ANKR');
  const userTotal = yield stakingContract.methods.totalStakes().call();
  const total = yield ankrContract.methods
    .balanceOf(stakingContract._address)
    .call();

  return {
    userTotal,
    total,
  };
}

function* updateUserInfo() {
  try {
    const providerContract = getContract('Provider');
    const payload = {
      displayName: window.ethereum.selectedAddress,
      providerInfo: {},
    };

    const info = yield providerContract.methods
      .getProviderInfo(window.ethereum.selectedAddress)
      .call();

    window.provider = providerContract;

    if (
      String(info.addr).toLowerCase() ===
      String(window.ethereum.selectedAddress).toLowerCase()
    ) {
      payload.providerInfo = {
        addr: info.addr,
        email: Web3.utils.hexToAscii(info.email),
        name: Web3.utils.hexToAscii(info.name),
        iconUrl: Web3.utils.hexToAscii(info.iconUrl),
        status: Number(info.status) === 0 ? 'Active' : 'Blocked',
      };
    }

    yield put(createSuccessAction(UserActionTypes.UPDATE_USER_INFO, payload));
  } catch (error) {
    yield put(createErrorAction(UserActionTypes.UPDATE_USER_INFO, error));
  }
}

function* onSignIn(action: Action<null>) {
  try {
    if (window.web3) {
      // TODO update the deprecated call https://docs.metamask.io/guide/ethereum-provider.html#legacy-methods
      yield window.ethereum.enable();
      window.contracts = {};
      window.web3 = new Web3(window.web3.currentProvider);
      window.web3.eth.defaultAccount = window.ethereum.selectedAddress;
      window.web3.eth.personal.defaultAccount = window.ethereum.selectedAddress;
    } else {
      alert('Please install MetaMask to use this dApp!');
    }

    const getMicropoolsPayload = yield getUserMicropools();
    const getProvidersPayload = yield getProviders();
    const getStakeStatsPayload = yield getStakeStats();

    console.log(
      'payload',
      getMicropoolsPayload,
      getProvidersPayload,
      getStakeStatsPayload,
    );

    yield put(createSuccessAction(UserActionTypes.SIGN_IN));
    yield put(UserActions.updateUserInfo());
  } catch (error) {
    yield put(createErrorAction(UserActionTypes.SIGN_IN, error));
  }
}

export function* userSaga() {
  yield takeEvery(UserActionTypes.SIGN_IN, onSignIn);
  yield takeEvery(UserActionTypes.UPDATE_USER_INFO, updateUserInfo);
}
