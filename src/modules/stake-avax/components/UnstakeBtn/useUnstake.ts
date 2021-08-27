import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import Web3 from 'web3';
import { AvalancheActions } from '../../actions/AvalancheActions';
import { useDialog } from '../../hooks/useDialog';
import { IUnstakeFormValues } from '../UnstakeDialog';

export const useUnstake = () => {
  const dispatchRequest = useDispatchRequest();
  const { isOpened, onClose, onOpen } = useDialog();

  const { data: claimServeTime } = useQuery<Date | null>({
    type: AvalancheActions.fetchClaimServeTime.toString(),
  });

  const { loading } = useMutation({
    type: AvalancheActions.claimAvax.toString(),
  });

  const onSubmit = ({ amount }: IUnstakeFormValues) => {
    dispatchRequest(
      AvalancheActions.claimAvax(Web3.utils.toWei(`${amount}`)),
    ).then(data => {
      if (!data.error) {
        dispatchRequest(AvalancheActions.fetchTransactionStatus());
        dispatchRequest(AvalancheActions.fetchStakerStats());
        dispatchRequest(AvalancheActions.fetchUnstakedBalance());
        onClose();
      }
    });
  };

  return {
    isLoading: loading,
    endDate: claimServeTime || undefined,
    isOpened,
    onClose,
    onOpen,
    onSubmit,
  };
};
