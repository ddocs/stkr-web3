import { Action, handleActions } from 'redux-actions';
import {
  CLOSE_MODAL_ACTION,
  KnownModal,
  OPEN_MODAL_ACTION,
  RESET_STORE,
} from './actions';
import { ModalsInternal } from './selectors';

const NO_MODAL_OPENED: ModalsInternal = { currentModal: undefined };

export const modals = handleActions(
  {
    [OPEN_MODAL_ACTION]: (_, { payload }: Action<KnownModal>) => ({
      currentModal: payload,
    }),
    [CLOSE_MODAL_ACTION]: () => NO_MODAL_OPENED,
    // ----
    [RESET_STORE]: () => NO_MODAL_OPENED,
  },
  NO_MODAL_OPENED,
);
