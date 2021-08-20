import { useDispatchRequest, useMutation } from '@redux-requests/react';
import { useCallback } from 'react';
import { AvalancheActions } from '../../actions/AvalancheActions';
import { IClaimPayload } from '../../api/types';
import { useDialog } from '../../hooks/useDialog';

export const useClaim = () => {
  const dispatchRequest = useDispatchRequest();
  const { isOpened, onClose, onOpen } = useDialog();

  const { loading } = useMutation({
    type: AvalancheActions.depositToAvalancheBridge.toString(),
  });

  const onSubmit = useCallback(
    (payload: IClaimPayload) => {
      dispatchRequest(AvalancheActions.depositToAvalancheBridge(payload)).then(
        ({ error }) => {
          if (error) {
            dispatchRequest(AvalancheActions.fetchTransactionStatus());
          } else {
            onClose();
          }
        },
      );
    },
    [dispatchRequest, onClose],
  );

  return {
    isOpened,
    onClose,
    onOpen,
    onSubmit,
    loading,
  };
};
