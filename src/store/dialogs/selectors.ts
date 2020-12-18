import { KnownModal } from './actions';
import { IStoreState } from '../reducers';
import { useSelector } from 'react-redux';

export interface IDialogState {
  currentModal?: KnownModal;
}

export function useDialog(modalId: KnownModal) {
  return useSelector((state: IStoreState) => {
    return state.dialog.currentModal === modalId;
  });
}
