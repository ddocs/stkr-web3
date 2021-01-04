import { put, takeEvery } from 'redux-saga/effects';
import { success } from '@redux-requests/core';
import { GovernanceActionTypes } from '../../../store/actions/GovernanceActions';
import {
  DIALOG_GOVERNANCE_PROJECT_CREATED,
  openModalAction,
} from '../../../store/dialogs/actions';

function* onCreateProject() {
  yield put(openModalAction(DIALOG_GOVERNANCE_PROJECT_CREATED));
}

export function* governanceSaga() {
  yield takeEvery(
    success(GovernanceActionTypes.CREATE_PROJECT),
    onCreateProject,
  );
}
