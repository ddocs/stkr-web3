/* eslint-disable @typescript-eslint/interface-name-prefix */
import { KnownModal } from './actions';

export interface ModalsInternal {
  currentModal: KnownModal | undefined;
}

export interface ModalState {
  modals: ModalsInternal;
}

export const getOpenedModal = ({ modals }: ModalState) => modals.currentModal;
