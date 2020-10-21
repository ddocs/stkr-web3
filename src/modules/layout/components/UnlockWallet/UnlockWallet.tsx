import { CustomDialog } from '../../../../components/CustomDialog';
import React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import { getOpenedModal } from '../../../../store/modals/selectors';
import { closeModalAction, KnownModal } from '../../../../store/modals/actions';
import { UnlockWalletContent } from './UnlockWalletContent';

const UnlockWalletComponent = ({
  openedModal,
  closeModal,
}: {
  openedModal: KnownModal | undefined;
  closeModal(): any;
}) => {
  return (
    <CustomDialog
      open={openedModal === 'unlock-wallet'}
      onClose={closeModal}
      transitionOpacity={true}
    >
      <UnlockWalletContent />
    </CustomDialog>
  );
};

export const UnlockWallet = connect(
  (state: IStoreState) => ({
    openedModal: getOpenedModal(state),
  }),
  {
    closeModal: closeModalAction,
  },
)(UnlockWalletComponent);
