export const OPEN_MODAL_ACTION = 'modal/OPEN';
export const CLOSE_MODAL_ACTION = 'modal/CLOSE';
export const RESET_STORE = 'reset/all';

export type KnownModal = 'unlock-wallet';

export const openModalAction = (modal: KnownModal) => ({
  type: OPEN_MODAL_ACTION,
  payload: modal,
});
export const closeModalAction = () => ({ type: CLOSE_MODAL_ACTION });

export const openUnlockWalletAction = () => openModalAction('unlock-wallet');
