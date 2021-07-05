import { closeModalAction, KnownModal, openModalAction } from './actions';
import { IStoreState } from '../../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

export interface IDialogState {
  currentModal?: KnownModal;
}

export function useDialog(modalId: KnownModal) {
  const dispatch = useDispatch();
  return {
    isOpened: useSelector((state: IStoreState) => {
      return state.dialog.currentModal === modalId;
    }),
    handleClose: useCallback(() => {
      dispatch(closeModalAction());
    }, [dispatch]),
    handleOpen: () => dispatch(openModalAction(modalId)),
  };
}
