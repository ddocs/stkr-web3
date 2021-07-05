import { Action, handleActions } from 'redux-actions';
import {
  CLOSE_MODAL_ACTION,
  KnownModal,
  OPEN_MODAL_ACTION,
  RESET_STORE,
} from './actions';
import { IDialogState } from './selectors';

const NO_DIALOG_OPENED: IDialogState = { currentModal: undefined };

export const dialog = handleActions<IDialogState, any>(
  {
    [OPEN_MODAL_ACTION]: (state, { payload }: Action<KnownModal>) => ({
      ...state,
      currentModal: payload,
    }),
    [CLOSE_MODAL_ACTION]: state => ({
      ...state,
      ...NO_DIALOG_OPENED,
    }),
    [RESET_STORE]: state => ({ ...state, ...NO_DIALOG_OPENED }),
  },
  NO_DIALOG_OPENED,
);
