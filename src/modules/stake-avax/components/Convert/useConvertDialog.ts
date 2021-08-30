import { useDispatchRequest, useMutation } from '@redux-requests/react';
import { AvalancheActions } from '../../actions/AvalancheActions';
import { useDialog } from '../../hooks/useDialog';
import { IConvertFormValues } from '../ConvertDialog';

export const useConvertDialog = () => {
  const dispatchRequest = useDispatchRequest();
  const { isOpened, onClose, onOpen } = useDialog();

  const { loading } = useMutation({
    type: AvalancheActions.depositToBridge.toString(),
  });

  const onSubmit = ({ amount, address }: IConvertFormValues) => {
    dispatchRequest(
      AvalancheActions.depositToBridge({
        amount: `${amount}`,
        address,
      }),
    ).then(({ error }) => {
      if (!error) {
        // dispatchRequest(AvalancheActions.checkWallet());
        dispatchRequest(AvalancheActions.fetchClaimStats());
        onClose();
      }
    });
  };

  return {
    isOpened,
    onClose,
    onOpen,
    onSubmit,
    isLoading: loading,
  };
};
